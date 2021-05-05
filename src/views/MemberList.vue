<template>
  <div class="member-list page">
    <div class="container">
      <base-breadcrumbs :routes="[this.$route.path]" />
      <h1 class="member-list__title">
        Lista de membros
      </h1>
      <div class="member-list__content grid">
        <div class="col-4 col-sm-12">
          <div class="box">
            <h2>Por estado</h2>
            <base-checkbox
              v-for="(state, index) in states"
              v-model="filters.states"
              :key="`state-${index}`"
              :value="state"
              :label="state"
            />
          </div>
        </div>
        <div class="col-8 col-sm-12 grid">
          <div class="col-12 box space-between">
            <span
              class="member-list__results"
            >Mostrando {{ people.results.length }} de
              {{ people.total }} resultados</span>
            <base-paginator
              :pages="people.pages"
              :value="people.current_page"
            />
          </div>
          <div class="col-12 grid">
            <person-card
              v-for="person in people.results"
              class="col-4 col-sm-6"
              :person="person"
              :key="person.id"
              @click="goToPersonPage(person.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <base-loader v-show="isLoading" />
  </div>
</template>

<script>
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BaseBreadcrumbs: () => import('@/components/UI/BaseBreadcrumbs.vue'),
    BasePaginator: () => import('@/components/UI/BasePaginator.vue'),
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
      isLoading: true,
    };
  },
  watch: {
    'filters.states': {
      handler(states) {
        let params = {};
        if (states.length) {
          params = {
            filter: 'by_states',
            filterData: states,
          };
        }
        this.loadPeople(params);
      },
    },
    '$route.params.page': {
      handler(value) {
        const page = value || 1;
        this.loadPeople({ page });
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
      await this.fetchPeople({ page: this.$route.page });
      await this.fetchStates();
      this.isLoading = false;
    },
    async loadPeople(params) {
      this.isLoading = true;
      await this.fetchPeople(params);
      this.isLoading = false;
    },
    goToPersonPage(id) {
      this.$router.push({ name: 'person-page', params: { id } });
    },
    ...mapActions({
      fetchPeople: 'fetchPeople',
      fetchStates: 'fetchStates',
    }),
  },
};
</script>

<style lang="scss">
.member-list {
  &__content {
    margin-top: 2.5em;
    .base-checkbox {
      text-transform: capitalize;
    }
  }
  &__title {
    margin-top: 1.5em;
  }
  &__results {
    font-size: 0.8em;
  }
}
</style>
