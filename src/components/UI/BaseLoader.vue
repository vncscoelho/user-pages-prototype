<template>
  <transition name="fade">
    <div class="base-loader">
      <div class="base-loader__spinner">
        <page-logo no-logotype />
      </div>
    </div>
  </transition>
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #fff;
  &__spinner {
    width: 53px;
    height: 52px;
    overflow: hidden;
    animation: spin 2s infinite linear;
  }
  .page-logo {
    height: 52px;
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
