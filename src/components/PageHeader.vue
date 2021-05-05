<template>
  <header class="page-header">
    <div class="page-header__wrapper container grid">
      <div class="col-7">
        <a
          href="/"
          class="page-header__logo"
        >
          <page-logo />
        </a>
      </div>
      <div class="col-5">
        <base-input
          class="page-header__search-box"
          placeholder="Procurar membro"
          icon="🔍"
          v-model="currentQuery"
          @blur="toggleFocus(false)"
          ref="search-box"
        >
          <div
            v-if="showSearchResults"
            class="page-header__search-results"
            slot="bottom"
          >
            <router-link
              v-for="result in searchResults"
              :key="result.id"
              :to="{ name: 'person-page', params: { id: result.id } }"
            >
              {{ result.fullName }}
            </router-link>
          </div>
        </base-input>
        <button @click="changeSearch">
          aaa
        </button>
      </div>
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
  data() {
    return {
      currentQuery: '',
      searchResults: [],
      inputFocus: false,
    };
  },
  computed: {
    showSearchResults() {
      return this.searchResults.length && this.inputFocus;
    },
  },
  created() {
    document.addEventListener('click', this.checkFocusOnInput);
  },
  deactivated() {
    document.removeEventListener('click', this.checkFocusOnInput);
  },
  methods: {
    async changeSearch() {
      await this.$api
        .getPeople({
          itemsByPage: 5,
          filter: 'by_name',
          filterData: this.currentQuery,
        })
        .then(({ results }) => {
          this.searchResults = results;
          this.toggleFocus(true);
        });
    },
    toggleFocus(value) {
      this.inputFocus = value;
    },
    checkFocusOnInput() {
      if (!document.activeElement.className.includes('.base-input__element')) {
        this.inputFocus = false;
      }
    },
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
  &__search-results {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    border: $border;
    a {
      display: block;
      padding: 1em 1.25em;
      text-transform: capitalize;
      text-decoration: none;
      color: $primary;
      &:hover {
        background: $grey-100;
      }
    }
  }
}
</style>
