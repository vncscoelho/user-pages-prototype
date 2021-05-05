<template>
  <div class="person-page">
    <div class="container">
      <base-breadcrumbs
        class="page"
        :routes="['/member-list', this.$route]"
      />
      <div
        class="grid"
        v-if="person"
      >
        <div class="person-page__profile col-12">
          <div class="person-page__thumbnail">
            <img
              :src="person.picture.large"
              :alt="person.fullName"
            >
          </div>
          <div class="person-page__title">
            <h1 class="capitalize">
              {{ person.fullName }}
            </h1>
            <small>Membro há {{ person.registered.age }} anos</small>
          </div>
        </div>
        <div class="col-6">
          <section class="person-page__data">
            <h2>Dados pessoais</h2>
            <dl>
              <dt>Telefones</dt>
              <dd>{{ person.cell }} / {{ person.phone }}</dd>
              <dt>E-mail</dt>
              <dd>{{ person.email }}</dd>
              <dt>Idade</dt>
              <dd>{{ person.dob.age }}</dd>
              <dt>Fuso horário</dt>
              <dd>
                {{ person.location.timezone.offset }}
                {{ person.location.timezone.description }}
              </dd>
            </dl>
          </section>
        </div>
        <div class="col-6">
          <section class="person-page__data">
            <h2>Endereço</h2>
            <dl>
              <dt>Rua</dt>
              <dd class="capitalize">
                {{ person.street }}
              </dd>
              <dt>Cidade</dt>
              <dd class="capitalize">
                {{ person.city }}
              </dd>
              <dt>Estado</dt>
              <dd class="capitalize">
                {{ person.state }}
              </dd>
              <dt>CEP</dt>
              <dd>{{ person.postcode }}</dd>
            </dl>
          </section>
        </div>
      </div>
    </div>
    <!-- eslint-disable vue/max-len -->
    <iframe
      v-if="person"
      class="person-page__map"
      :src="
        `https://www.openstreetmap.org/export/embed.html?bbox=-251.01562500000003%2C-79.36770077764092%2C92.81250000000001%2C84.73838712095339&amp;layer=mapnik&amp;marker=${person.location.coordinates.longitude}%2C${person.location.coordinates.latitude}`
      "
    />
    />
    <base-loader v-show="isLoading" />
  </div>
</template>

<script>
import BaseLoader from '@/components/UI/BaseLoader.vue';
import BaseBreadcrumbs from '@/components/UI/BaseBreadcrumbs.vue';

export default {
  components: {
    BaseLoader,
    BaseBreadcrumbs,
  },
  data() {
    return {
      isLoading: true,
      person: null,
    };
  },
  created() {
    this.loadPerson();
  },
  computed: {
    personId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async loadPerson() {
      if (this.personId) {
        await this.$api
          .getPeople({
            filter: 'by_id',
            filterData: this.personId,
            allData: true,
          })
          .then(({ results }) => {
            const [person] = results;
            this.person = person;
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.person-page {
  h1 {
    margin-bottom: 0;
    color: $secondary;
  }
  &__profile {
    display: flex;
  }
  &__thumbnail {
    border-radius: 50%;
    height: 128px;
    width: 128px;
    overflow: hidden;
    margin-right: 1em;
  }
  &__map {
    width: 100%;
    height: 400px;
    margin: 0;
    border: 0;
  }
  &__data {
    padding-bottom: 2em;

    dl {
      dt {
        margin-top: 1em;
        font-weight: bold;
      }
    }
  }

  .capitalize {
    text-transform: capitalize;
  }
}
</style>
