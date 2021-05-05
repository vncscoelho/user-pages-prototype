<template>
  <div class="member-list">
    <template v-if="!isLoading">
      <page-header />
      <div class="container">
        <base-breadcrumbs :routes="[this.$route.path]" />
        <h1>Lista de membros</h1>
        <div class="grid">
          <div class="box col-4">
            <h2>Por estado</h2>
            <base-checkbox
              v-for="(state, index) in states"
              v-model="filters.states"
              :key="`state-${index}`"
              :value="state"
              :label="state"
            />
          </div>
          <div class="col-8 grid">
            <div class="col-12 box">
              <span>Mostrando {{ people.length }} de
                {{ people.length }} resultados</span>
              <base-select
                :options="[
                  {
                    key: 'name',
                    label: 'Nome',
                  },
                  {
                    key: 'city',
                    label: 'Cidade',
                  },
                ]"
                v-model="filters.sort"
              />
            </div>
            <div class="col-12 grid">
              <person-card
                v-for="person in people"
                class="col-4"
                :person="person"
                :key="person.id"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <base-loader v-else />
  </div>
</template>

<script>
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    PageHeader: () => import('@/components/PageHeader.vue'),
    BaseBreadcrumbs: () => import('@/components/UI/BaseBreadcrumbs.vue'),
    BaseSelect: () => import('@/components/UI/BaseSelect.vue'),
    PersonCard: () => import('@/components/PersonCard.vue'),
    BaseCheckbox,
    BaseLoader,
  },
  data() {
    return {
      filters: {
        states: [],
        sort: null,
      },
      isLoading: false,
    };
  },
  watch: {
    'filters.states': {
      handler(states) {
        this.fetchPeople({
          filter: 'by_states',
          filterData: states,
        });
      },
    },
  },
  computed: {
    ...mapGetters({
      states: 'getStates',
      people: 'getPeople',
    }),
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.fetchPeople();
      await this.fetchStates();
    },
    ...mapActions({
      fetchPeople: 'fetchPeople',
      fetchStates: 'fetchStates',
    }),
  },
};
</script>

<style></style>
