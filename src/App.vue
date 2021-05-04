<template>
  <div id="app">
    <page-header />
  </div>
</template>
<script>
import API from '@/api';

export default {
  components: {
    PageHeader: () => import('@/components/PageHeader.vue'),
  },
  created() {
    const instance = new API();
    console.log(instance);
  },
};
</script>
<style lang="scss">
body {
  font-family: sans-serif;
}
</style>
