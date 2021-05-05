<template>
  <nav class="base-paginator">
    <span>Página:</span>
    <template v-for="number in pages">
      <router-link
        v-if="number !== value"
        class="base-paginator__item base-paginator__item--link"
        :to="{
          name: $route.name,
          params: {
            page: number,
          },
        }"
        :key="`base-paginator-${_uid}-${number}`"
      >
        {{ number }}
      </router-link>
      <span
        v-else
        class="base-paginator__item base-paginator__item--current"
        :key="`base-paginator-${_uid}-${number}`"
      >{{ number }}</span>
    </template>
  </nav>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.base-paginator {
  display: inline-flex;
  align-items: center;
  font-size: 0.8em;
  &__item {
    padding: 0 0.2em;
    &--link {
      color: $primary;
      text-decoration: none;
      &:hover {
        color: $secondary;
      }
    }
    &--current {
      color: $text;
      font-weight: bold;
    }
  }
}
</style>
