<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  recipes: {
    type: Array,
    default: () => [],
  },
});

const query = ref("");

const normalize = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const filteredRecipes = computed(() => {
  if (!query.value) return props.recipes;
  const q = normalize(query.value);
  return props.recipes.filter((recipe) =>
    normalize(recipe.data.title).includes(q),
  );
});
</script>

<template>
  <section class="hero-content">
    <div class="text-center">
      <h1>
        <span class="highlight highlight-primary">
          Recettes ({{ filteredRecipes.length }})</span
        >
      </h1>
      <input
        v-model="query"
        class="mt-sm neo-bubble"
        type="search"
        placeholder="Rechercher une recette"
        aria-label="Rechercher une recette"
      />
    </div>
  </section>

  <div class="container-lg">
    <ul class="grid grid-cols-3 gap-grid-md">
      <li v-for="recipe in filteredRecipes" :key="recipe.id" class="no-list">
        <a :href="recipe.id" class="neo-btn neo-btn-lg neo-btn-secondary">{{ recipe.data.title }}</a>
      </li>
    </ul>
  </div>
</template>
