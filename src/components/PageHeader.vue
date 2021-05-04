<template>
  <header class="page-header">
    <div class="page-header__wrapper container">
      <a
        href="/"
        class="page-header__logo"
      >
        <page-logo />
      </a>
      <base-input
        class="page-header__search-box"
        placeholder="Search"
        icon="🔍"
      />
    </div>
  </header>
</template>

<script>
import PageLogo from '@/components/PageLogo.vue';
import BaseInput from '@/components/UI/BaseInput.vue';

export default {
  components: {
    PageLogo,
    BaseInput,
  },
};
</script>

<style lang="scss">
.page-header {
  position: sticky;
  top: 0;
  padding: 1.75em 0;
  background-color: $grey-100;
  &__wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
