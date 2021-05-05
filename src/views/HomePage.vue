<template>
  <div class="home-page">
    <div class="home-page__call-to-action page">
      <div class="container">
        <transition-group
          name="fade"
          appear
          v-if="currentPerson"
        >
          <h1 key="1">
            {{ currentPerson.fullName }}
          </h1>
          <p key="2">
            É apenas um de nossos membros, espalhados pelo mundo inteiro.
          </p>
          <router-link
            key="3"
            to="member-list"
          >
            <base-button>Ver todos os membros</base-button>
          </router-link>
        </transition-group>
      </div>
    </div>
    <!-- eslint-disable vue/max-len -->
    <transition
      name="fade"
      appear
    >
      <div
        class="home-page__map"
        v-if="currentPerson"
      >
        <iframe
          :src="
            `https://www.openstreetmap.org/export/embed.html?bbox=-251.01562500000003%2C-79.36770077764092%2C92.81250000000001%2C84.73838712095339&amp;layer=mapnik&amp;marker=${currentPerson.longitude}%2C${currentPerson.latitude}`
          "
        />
      </div>
    </transition>
  </div>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton.vue';

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      currentPerson: null,
    };
  },
  created() {
    this.$api.getRandom().then((person) => {
      this.currentPerson = person;
    });
  },
};
</script>

<style lang="scss">
.home-page {
  h1 {
    text-transform: capitalize;
  }
  &__call-to-action {
    position: relative;
    text-align: center;
  }
  &__map {
    position: relative;

    iframe {
      width: 100%;
      height: 700px;
      border: 0;
      margin: 0;
    }

    &:after,
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 220px;
      background: linear-gradient(#fff 30%, transparent);
      content: '';
    }

    &:after {
      bottom: 0;
      top: unset;
      height: 50px;
      background: linear-gradient(transparent, #fff);
    }
  }
}
</style>
