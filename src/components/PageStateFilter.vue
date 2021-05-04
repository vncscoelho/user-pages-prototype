<template>
  <div class="page-state-filter">
    <base-checkbox
      v-for="(state, index) in states"
      :key="`state-${index}`"
      :value="state"
      :label="state"
      v-model="value"
    />
  </div>
</template>

<script>
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseCheckbox,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      states: 'getStates',
    }),
  },
  created() {
    this.$store.dispatch('fetchStates').then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style></style>
