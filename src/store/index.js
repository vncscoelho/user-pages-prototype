import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/api';

Vue.use(Vuex);

const api = new API();

export default new Vuex.Store({
  state: {
    people: {
      results: [],
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
        page: 3,
      },
    ) {
      api.getPeople(params).then((data) => {
        commit('SET_PEOPLE', data);
      });
    },
    fetchStates({ commit }) {
      api.getStates().then((data) => {
        commit('SET_STATES', data);
      });
    },
  },
});
