<template>
  <section class="person-card box">
    <template v-if="person">
      <div class="person-card__thumbnail">
        <img
          :src="person.thumbnail"
          alt="Imagem de etc"
        >
      </div>
      <h3 class="person-card__name">
        {{ person.fullName }}
      </h3>
      <p class="person-card__address">
        {{ person.street }}
      </p>
      <p class="person-card__address person-card__address--small">
        {{ person.city }}
      </p>
      <p class="person-card__address person-card__address--small">
        {{ person | compactAddress }}
      </p>
    </template>
  </section>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    compactAddress({ state, postcode }) {
      return `${state} - CEP: ${postcode}`;
    },
  },
};
</script>

<style lang="scss">
.person-card {
  padding: 2.25em 1em;
  text-align: center;
  text-transform: capitalize;
  &__thumbnail {
    display: inline-block;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    overflow: hidden;
  }
  &__name {
    margin: 1em 0;
  }
  &__address {
    margin-top: 1em;
    &--small {
      margin: 0;
      font-size: 0.8em;
    }
  }
}
</style>
