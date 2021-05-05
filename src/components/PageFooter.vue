<template>
  <footer class="page-footer">
    <div class="container">
      <page-logo white />
    </div>
  </footer>
</template>

<script>
import PageLogo from '@/components/PageLogo.vue';

export default {
  components: { PageLogo },
};
</script>

<style lang="scss">
.page-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em 0;
  background: $text;
}
</style>
