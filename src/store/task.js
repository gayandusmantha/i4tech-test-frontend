import router from "@/router";
import { http } from "../config/http";

import _ from "lodash";

const namespaced = true;


const getDefaultState = () => {
  return {
    taskDetails: [],
    tastUpdateDetails:[]
  };
};

const state = getDefaultState();

const mutations = {
    getTaskListData(state, data) {
    if (data != null) {
      state.taskDetails = data;
    } else {
      state.taskDetails = null;
    }
  },
  getTaskUpdateData(state, data) {
    if (data != null) {
      state.tastUpdateDetails = data;
    } else {
      state.tastUpdateDetails = null;
    }
  },

  
};

const actions = {
  async getTaskList({ commit }, data) {
    await http
      .get("task/show"+data)
      .then((response) => {
        if (response) {
          commit("getTaskListData", response.data.data);
        } else {
          commit("getTaskListData", null);
        }
      })
      .catch((error) => {
        //   console.log(error);
      });
  },
  async changeStatus({ commit }, data) {
    await http
      .post("/task/update/"+data)
      .then((response) => {
        if (response) {
          commit("getTaskUpdateData", response.data.data);
        } else {
          commit("getTaskUpdateData", null);
        }
      })
      .catch((error) => {
        //   console.log(error);
      });
  },

 
};

export default {
    namespaced,
    state,
    actions,
    mutations
};
