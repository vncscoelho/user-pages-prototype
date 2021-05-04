import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/api';

Vue.use(Vuex);

const api = new API();

export default new Vuex.Store({
  state: {
    states: [],
  },
  getters: {
    getStates({ states }) {
      return states;
    },
  },
  mutations: {
    SET_STATES(state, data) {
      state.states = data;
    },
  },
  actions: {
    fetchStates({ commit }) {
      api.getStates().then((data) => {
        commit('SET_STATES', data);
      });
    },
  },
});
