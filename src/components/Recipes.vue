<script setup>
import { ref, toRef, watch } from 'vue';
import { getTypeClass } from '../helpers';

const props = defineProps({
  recipes: Array,
})
let recipes = toRef(props, 'recipes')
const query = ref('');
const recipes_origins = props.recipes;

watch(query, async () => {
  if (query.value) {
    recipes = recipes_origins.filter((recipe) =>
      recipe.data.title.toLowerCase().includes(query.value.toLowerCase())
    )
  } else {
    recipes = recipes_origins;
  }
})
</script>

<template>
  <section class="hero is-dark">
    <div class="hero-body has-text-centered">
      <h1 class="title has-text-weight-normal is-3">
        Recettes ({{ recipes.length }})
      </h1>
      <p class="subtitle is-5">Orientées débutant(e)s</p>
    </div>
  </section>

  <div class="has-background-white">
    <div class="mx-2 columns is-centered my-3 is-variable is-0-mobile is-0-tablet">
      <div class="column is-2">
        <input v-model="query" class="input" type="search" placeholder="Rechercher une recette"
          aria-describedby="Rechercher une recette" />
      </div>
    </div>

    <div class="mx-2 pb-5 columns is-multiline is-variable is-0-mobile is-0-tablet is-3-desktop">
      <div v-for="recipe in recipes" class="column is-3">
        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <a :href="recipe.slug">{{ recipe.data.title }}</a>
                </p>
              </div>
            </div>
            <div>
              <span :class="getTypeClass(recipe.data.type)" class="tag has-text-white-bis">
                {{ recipe.data.type }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>