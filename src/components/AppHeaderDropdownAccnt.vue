<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
     
      <CDropdownItem @click="logout()" > <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import router from "@/router";
import { mapState, mapActions } from "vuex";
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
   computed: {
    testMsg: function () {
      console.log(this.userData.first_name);
    },
    ...mapState("login", ["userData"]),
  },
    methods: {
     ...mapActions("login", ["destoryToken"]) ,
   async logout() {      
       await this.destoryToken();
     // router.push("/pages/logout");
    }
  },
}
</script>
