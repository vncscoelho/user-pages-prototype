<template>
  <div class="base-loader">
    <page-logo no-logotype />
  </div>
</template>

<script>
import PageLogo from '@/components/PageLogo.vue';

export default {
  components: {
    PageLogo,
  },
};
</script>

<style lang="scss">
.base-loader {
  width: 33px;
  height: 32px;
  overflow: hidden;
  animation: spin 2s infinite linear;
  .page-logo {
    height: 32px;
  }
  @keyframes spin {
    from {
      transform: rotate(-180deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
}
</style>
