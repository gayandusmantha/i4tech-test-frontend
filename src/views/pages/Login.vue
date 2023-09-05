<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CAlert v-if="servererrors" show color="danger">
                  {{ servererrors }}
                </CAlert>
                <CForm action="#" @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      v-model="email"
                      autocomplete="username email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Password"
                      type="password"
                      autocomplete="curent-password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" type="submit"
                        >Login</CButton
                      >
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      servererrors: null,
    }
  },
  mounted() {
    if (this.access_token !== null) {
      router.push('/dashboard')
    }
  },
  computed: {
    ...mapState('login', ['access_token']),
  },
  methods: {
    ClearError() {
      this.servererrors = null
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    ...mapActions('login', ['getToken']),
    async login() {
      const userdata = {
        email: this.email,
        password: this.password,
        remember_me: true,
      }
      await this.getToken(userdata)
      if (this.access_token === null) {
        this.email = null
        this.password = null
        this.servererrors = 'Invalid Login Credentials'
      }
    },
  },
}
</script>
