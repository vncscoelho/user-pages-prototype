<template>
  <div class="person-page container page">
    <div
      class="grid"
      v-if="person.dob"
    >
      <div class="col-12">
        <img
          :src="person.picture.large"
          :alt="person.fullName"
        >
        <h1>{{ person.fullName }}</h1>
        <small>Membro há {{ person.registered.age }} anos</small>
      </div>
      <div class="col-6">
        <section>
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
        <section>
          <h2>Endereço</h2>
          <dt>Rua</dt>
          <dd>{{ person.street }}</dd>
          <dt>Cidade</dt>
          <dd>{{ person.city }}</dd>
          <dt>Estado</dt>
          <dd>{{ person.state }}</dd>
          <dt>CEP</dt>
          <dd>{{ person.postcode }}</dd>
        </section>
      </div>
      <div class="col-12">
        <!-- eslint-disable vue/max-len -->
        <iframe
          class="person-page__map"
          width="100%"
          height="400"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          :src="
            `https://www.openstreetmap.org/export/embed.html?bbox=${person.location.coordinates.latitude}%2C${person.location.coordinates.longitude}%2C-20.459093749523166%2C-50.717844716742476&amp;layer=mapnik`
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
}
</style>
