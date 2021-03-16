<template>
  <section>
    <div class="row mx-auto d-print-none">
      <b-breadcrumb class="col-lg-9">
        <b-breadcrumb-item active>Accueil</b-breadcrumb-item>
      </b-breadcrumb>
      <b-col lg="3" class="mt-lg-1 px-0 px-lg-2">
        <b-form-input
          v-model="searchQuery"
          type="search"
          placeholder="Recherche par nom"
          aria-label="Recherche par nom"
        >
        </b-form-input>
      </b-col>
    </div>
    <div class="row">
      <b-col cols="12" class="d-none d-sm-block text-center">
        <h1>{{ title }} ({{ recipes.length }})</h1>
      </b-col>

      <b-col cols="12">
        <b-form inline>
          <p class="pt-3 mx-2">Trier par type :</p>
          <b-form-checkbox
            id="sucre"
            v-model="searchByType"
            name="sucre"
            value="sucré"
            unchecked-value=""
          >
            <b-badge variant="info" class="py-2 px-3 font-weight-bold"
              >Sucré</b-badge
            >
          </b-form-checkbox>

          <b-form-checkbox
            id="sale"
            v-model="searchByType"
            name="sale"
            value="salé"
            unchecked-value=""
            class="ml-2"
          >
            <b-badge variant="success" class="py-2 px-3">Salé</b-badge>
          </b-form-checkbox>
        </b-form>
      </b-col>

      <b-card-group class="col-12">
        <div
          v-for="(recipe, index) in recipes"
          :key="index"
          class="col-sm-4 col-12 px-0 px-sm-2"
        >
          <b-card class="mb-3 bg-dark">
            <NuxtLink :to="recipe.slug" class="text-white">
              <h2 class="h6 font-weight-bold">
                {{ recipe.title }}
              </h2>
            </NuxtLink>
            <b-badge
              :variant="recipe.type === 'sucré' ? 'info' : 'success'"
              class="py-2 px-3"
              >{{ recipe.type }}</b-badge
            >
          </b-card>
        </div>
      </b-card-group>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageIndex',
  async asyncData({ $content, params }) {
    const recipes = await $content('recipes')
      .only(['title', 'slug', 'type'])
      .sortBy('title', 'asc')
      .fetch()

    return { recipes }
  },
  data() {
    return {
      title: 'Recettes',
      searchQuery: '',
      searchByType: '',
      recipes: [],
      recipes_origins: [],
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.recipes = this.recipes_origins
        return
      }

      this.recipes = await this.search(searchQuery)
    },

    async searchByType() {
      if (!this.searchByType) {
        this.recipes = this.recipes_origins
        return
      }

      this.recipes = await this.recipes_origins.filter(
        (recipe) => recipe.type === this.searchByType
      )
    },
  },
  mounted() {
    this.recipes_origins = this.recipes
  },
  methods: {
    search(searchQuery) {
      searchQuery = this.slugify(searchQuery)

      return this.recipes_origins.filter((recipe) =>
        this.slugify(recipe.title).includes(searchQuery)
      )
    },
    slugify(str) {
      const map = {
        a: 'á|à|ã|â|À|Á|Ã|Â',
        e: 'é|è|ê|É|È|Ê',
        i: 'í|ì|î|Í|Ì|Î',
        o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        c: 'ç|Ç',
        n: 'ñ|Ñ',
      }

      for (const pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern)
      }

      return str.toLowerCase().trim()
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
