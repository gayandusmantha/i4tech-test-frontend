<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader> <CIcon icon="cil-drop" /> Task List </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs> </CCol>
            <CCol xs>
              <CFormInput
                placeholder="Search"
                v-on:keyup="searchByProjectName"
                v-model="projectName"
              />
            </CCol>
          </CRow>

          <CTable v-if="loader">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col"> Task Name </CTableHeaderCell>
                <CTableHeaderCell scope="col">Description </CTableHeaderCell>
                <CTableHeaderCell
                  scope="col"
                  @click="sortColumfunc('due_date', sortDiraction)"
                  >Due Date
                  <CIcon v-if="sortDiraction === 'asc'" icon="cil-arrow-top" />
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Project</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="task in taskListData" :key="task.id">
                <CTableHeaderCell scope="row"> {{ task.id }} </CTableHeaderCell>
                <CTableDataCell>{{ task.name }}</CTableDataCell>
                <CTableDataCell>{{ task.description }}</CTableDataCell>
                <CTableDataCell>{{ task.due_date }}</CTableDataCell>
                <CTableDataCell>{{ task.project_info?.name }}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="success"
                    v-if="task.status == 'completed'"
                    disabled
                  >
                    {{ task.status }}
                  </CButton>
                  <CButton color="warning" v-else @click="changeStat(task.id)">
                    {{ task.status }}
                  </CButton></CTableDataCell
                >
              </CTableRow>
            </CTableBody>
          </CTable>
          <CButton v-if="!loader" disabled>
            <CSpinner component="span" size="sm" aria-hidden="true" /> Loading
          </CButton>
        </CCardBody>
        <CRow>
          <CCol xs> </CCol>
          <CCol xs> </CCol>
          <CCol sm>
            <CFormSelect
              aria-label="Default select example"
              @change="paginate"
              v-model="perPage"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </CFormSelect>
            <br />
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Colors',
  data: () => ({
    taskListData: [],
    sortColum: 'name',
    projectName: '',
    loader: false,
    perPage: 5,
    sortDiraction: 'asc',
  }),
  async created() {
    this.getTaskListData()
  },
  computed: {
    ...mapState('task', ['taskDetails', 'tastUpdateDetails']),
  },
  methods: {
    ...mapActions('task', ['getTaskList', 'changeStatus']),
    async getTaskListData() {
      await this.getTaskList('')
      if (this.taskDetails) {
        this.taskListData = await this.taskDetails
        this.loader = true
      }
    },
    searchByProjectName: _.debounce(function (event) {
      this.sortColumfunc(this.sortColum, this.sortDiraction)
    }, 800),
    paginate() {
      this.sortColumfunc(this.sortColum, this.sortDiraction)
    },
    async sortColumfunc(name, sortDiraction) {
      this.loader = false
      this.sortDiraction = sortDiraction == 'asc' ? 'desc' : 'asc'
      this.sortColum = name
      await this.getTaskList(
        '?sort=' +
          this.sortColum +
          '|' +
          this.sortDiraction +
          '&project_name=' +
          this.projectName +
          '&per_page' +
          this.perPage,
      )
      if (this.taskDetails) {
        this.taskListData = await this.taskDetails
        this.loader = true
      }
    },

    async changeStat(id) {
      if (confirm('are you sure?')) await this.changeStatus(id)
      this.sortColumfunc(this.sortColum, this.sortDiraction)
    },
  },
}
</script>
