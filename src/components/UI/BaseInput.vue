<template>
  <div class="base-input box">
    <span
      v-if="icon"
      class="base-input__icon"
    >
      {{ icon }}
    </span>
    <input
      type="text"
      class="base-input__element"
      v-bind="{ ...$attrs }"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
    <slot name="bottom" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.base-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75em 1em;
  background: #fff;
  &__element {
    width: 100%;
    outline: none;
    border: 0;
    background: none;
    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }
  &__icon {
    & + input {
      padding-left: 0.75em;
    }
  }
}
</style>
