<template>
  <label
    :for="`base-checkbox-${_uid}`"
    class="base-checkbox"
  >
    <input
      :id="`base-checkbox-${_uid}`"
      type="checkbox"
      class="base-checkbox__input"
      :value="value"
      v-bind="$attrs"
      @input="handleChange"
    >
    <span class="base-checkbox__text">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'allValues',
  },
  props: {
    allValues: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleChange() {
      const currentValues = this.allValues;
      const currentIndex = currentValues.findIndex((key) => key === this.value);

      if (currentIndex >= 0) {
        this.$delete(currentValues, currentIndex);
      } else {
        currentValues.push(this.value);
      }

      this.$emit('input', currentValues);
    },
  },
};
</script>

<style lang="scss">
.base-checkbox {
  display: block;
  &__text {
    padding-left: 0.2em;
  }
}
</style>
