<template>
  <nav class="base-breadcrumbs">
    <div
      v-for="({ route, current }, index) in resolvedRoutes"
      class="base-breadcrumbs__item"
      :class="{ 'base-breadcrumbs__item--current': current }"
      :key="`base-breadcrumbs-route-${index}`"
    >
      <span v-if="current">{{ route.meta.title }}</span>
      <router-link
        v-else
        class="base-breadcrumbs__item"
        :to="route"
      >
        {{ route.meta.title }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    resolvedRoutes() {
      const allRoutes = ['/', ...this.routes];
      return allRoutes.map((routeName) => {
        let current = false;
        const { resolved } = this.$router.resolve(routeName);

        if (resolved.name === this.$route.name) {
          current = true;
        }

        return { route: resolved, current };
      });
    },
  },
};
</script>

<style lang="scss">
.base-breadcrumbs {
  display: inline-flex;
  &__item {
    display: inline-flex;
    a {
      text-decoration: none;
      color: $primary;
      &:hover {
        color: $secondary;
      }
    }
    &--current span {
      font-weight: bold;
    }
    &:not(:last-child):after {
      content: '»';
      padding: 0 0.25em;
    }
  }
}
</style>
