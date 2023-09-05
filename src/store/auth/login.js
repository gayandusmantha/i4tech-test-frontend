import router from "@/router";
import { http } from "../../config/http";

import _ from "lodash";

const namespaced = true;

const getDefaultState = () => {
  return {
    userPermissions: []
  };
};

const state = {
  access_token: localStorage.getItem("access_token") || null,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  checkAuthStat: false,
};

const getters = {
  loggedIn() {lo
    return localStorage.getItem("access_token") != null;
  },

  userData() {
    return JSON.parse(localStorage.getItem("userData"));
  },
};

const mutations = {
  doLogin(state, response) {
    const token = response.data.authentication_data.access_token;
    if (token) {
      localStorage.setItem("access_token", token);
      localStorage.setItem(
        "userData",
        JSON.stringify(response.data.user_data.role[0].name)
      );
      state.access_token = token;
      console.log(response.data.user_data);
      state.userData = response.data.user_data;
      router.push("/dashboard");
    } else {
    }
  },

  checkAuthMu(state, response) {
    if (response.data != null) {
      state.checkAuthStat = response.data;
    } else {
      state.checkAuthStat = null;
    }
  },

  doLogout(state) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    localStorage.removeItem("site_id");
    localStorage.removeItem("site_info");
    state.access_token = null;
    state.userData = null;
    router.push("/pages/login");
  },
};

const actions = {
  async getToken({ commit }, data) {
    let email = data.email;
    let password = data.password;

    await http
      .post("backend/login", data)
      .then((response) => {
        if (response) {
          commit("doLogin", response);
        } else {
          console.log(response.data);
          commit("doLogout", response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async destoryToken({ commit }) {
    await http
      .post("logout", null, {})
      .then((response) => {
        if (response.data.status == "true") {
          commit("doLogout");
        } else {
          commit("doLogout");
        }
      })
      .catch((error) => {
        console.log(error);
        commit("doLogout");
      });
  },
  async checkAuth({ commit }) {
    await http.post("backend/validate").then((response) => {
      if (response) {
        commit("checkAuthMu", response);
      } else {
        commit("checkAuthMu", response);
      }
    });
  },
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
