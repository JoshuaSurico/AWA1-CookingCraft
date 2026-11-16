<template>
  <div class="app-container">
    <AppNavbar
      v-model="searchQuery"
      @go-home="selectedRecipe = null"
    />

    <!-- PAGE 1 : LISTE DES RECETTES -->
    <RecipeList
      v-if="!selectedRecipe"
      :recipes="recipes"
      :loading="loading"
      :error="error"
      :search-query="searchQuery"
      @select-recipe="handleSelectRecipe"
    />

    <!-- PAGE 2 : DÉTAIL D'UNE RECETTE -->
    <RecipeDetail
      v-else
      :recipe="selectedRecipe"
      @back="selectedRecipe = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppNavbar from './components/AppNavbar.vue';
import RecipeList from './components/RecipeList.vue';
import RecipeDetail from './components/RecipeDetail.vue';

const recipes = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const selectedRecipe = ref(null);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/items');
    if (!res.ok) throw new Error(`Erreur réseau (${res.status})`);
    recipes.value = await res.json();
  } catch (err) {
    error.value = "Impossible de joindre l'API Express. Assurez-vous que `npm run server` tourne.";
  } finally {
    loading.value = false;
  }
});

function handleSelectRecipe(recipe) {
  selectedRecipe.value = recipe;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style>
/* Style global de base */
body {
  margin: 0;
  background-color: #f9fafb;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.app-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 1.5rem;
}
</style>