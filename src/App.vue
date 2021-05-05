<template>
  <div id="app">
    <page-header />
    <router-view />
    <page-footer />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter,
  },
};
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  color: $text;
}
.box {
  border: $border;
  @extend .spaced;
}
.spaced {
  padding: 1em 1.25em;
}
.space-between {
  display: flex;
  justify-content: space-between;
}
.page {
  padding: 2em 0;
}
.fade {
  &-leave-active,
  &-enter-active {
    transition: 200ms ease-in-out;
  }
  &-leave,
  &-enter-to {
    opacity: 1;
  }
  &-leave-to,
  &-enter {
    opacity: 0;
  }
}
</style>
