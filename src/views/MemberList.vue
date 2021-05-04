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
              v-model="checkedStates"
              :key="`state-${index}`"
              :value="state"
              :label="state"
            />
          </div>
          <div class="col-8 grid">
            <div class="col-12 box">
              Mostrando x de 12 resultados
            </div>
            <div class="col-12 spaced">
              results
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
import { mapGetters } from 'vuex';

export default {
  components: {
    PageHeader: () => import('@/components/PageHeader.vue'),
    BaseBreadcrumbs: () => import('@/components/UI/BaseBreadcrumbs.vue'),
    BaseCheckbox,
    BaseLoader,
  },
  data() {
    return {
      checkedStates: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      states: 'getStates',
    }),
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchStates').then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style></style>
