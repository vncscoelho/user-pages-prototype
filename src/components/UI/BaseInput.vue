<template>
  <div class="base-input">
    <span
      v-if="icon"
      class="base-input__icon"
    >
      {{ icon }}
    </span>
    <input
      type="text"
      class="base-input__element"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.base-input {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75em 1em;
  border: 1px solid $grey-300;
  border-radius: $radius;
  background: #fff;
  &__element {
    outline: none;
    border: 0;
    background: none;
  }
  &__icon {
    & + input {
      padding-left: 0.75em;
    }
  }
}
</style>
