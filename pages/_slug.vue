<template>
  <section>
    <div class="row mx-auto d-print-none">
      <b-breadcrumb class="col-lg-9">
        <b-breadcrumb-item to="/">Accueil</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ recipe.title }}</b-breadcrumb-item>
      </b-breadcrumb>
      <b-col lg="3" class="h5 px-0 px-lg-2">
        <b-badge
          class="py-2 px-3 mt-lg-2 mt-0"
          :variant="recipe.type === 'sucré' ? 'info' : 'success'"
          >{{ recipe.type }}</b-badge
        >
      </b-col>
    </div>
    <article class="row">
      <b-col cols="12">
        <h1 class="d-none d-sm-block text-white bg-dark p-2 mb-4 text-center">
          {{ recipe.title }}
        </h1>
        <div
          v-if="recipe.image"
          class="flex items-center justify-center d-print-none"
        >
          <img :src="recipe.image" alt="" width="720" />
        </div>
        <nuxt-content :document="recipe" class="d-print-none" />
      </b-col>
      <section class="col-md-5">
        <h2 class="h4">Ingrédients</h2>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <h3 v-if="ingredient.step" class="h5">{{ ingredient.step }}</h3>
          <ul class="ml-0">
            <li v-for="list in ingredient.list" :key="list">
              {{ list }}
            </li>
          </ul>
        </div>
      </section>
      <section class="col-md-7">
        <h2 class="h4">Instructions</h2>
        <div v-for="(direction, index) in recipe.directions" :key="index">
          <h3 v-if="direction.step" class="h5">{{ direction.step }}</h3>
          <ol>
            <li v-for="list in direction.list" :key="list">
              {{ list }}
            </li>
          </ol>
        </div>
      </section>
    </article>
  </section>
</template>

<script>
export default {
  name: 'PageRecipe',
  async asyncData({ $content, params }) {
    const recipe = await $content('recipes', params.slug).fetch()
    return { recipe }
  },
  head() {
    return {
      title: this.recipe.title,
    }
  },
}
</script>
