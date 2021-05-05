<template>
  <button
    class="base-button"
    @click="$emit('click')"
    v-bind="{ ...$attrs }"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.base-button {
  padding: 1em 1.25em;
  border: 0;
  background: $primary;
  color: #fff;
  &:hover {
    background: lighten($primary, 10%);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: $primary;
    }
  }
}
</style>
