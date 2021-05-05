import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/api';

Vue.use(Vuex);

const api = new API();

export default new Vuex.Store({
  state: {
    people: {
      results: [],
      current_page: 0,
      pages: 0,
      total: 0,
    },
    states: [],
  },
  getters: {
    getPeople({ people }) {
      return people;
    },
    getStates({ states }) {
      return states;
    },
  },
  mutations: {
    SET_PEOPLE(state, data) {
      state.people = data;
    },
    SET_STATES(state, data) {
      state.states = data;
    },
  },
  actions: {
    fetchPeople(
      { commit },
      params = {
        filter: null,
        filterData: null,
        page: 0,
      },
    ) {
      return api.getPeople(params).then((data) => {
        console.log(data);
        commit('SET_PEOPLE', data);
      });
    },
    fetchStates({ commit }) {
      return api.getStates().then((data) => {
        commit('SET_STATES', data);
      });
    },
  },
});
