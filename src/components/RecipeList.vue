<template>
  <main class="catalog-view">
    <!-- Barre de filtres (Interaction CSS 2) -->
    <section class="filters-section" aria-label="Filtres de recettes">
      <div class="filter-group">
        <span class="filter-label">FILTRES :</span>
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="filter-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat }}
          <span v-if="cat === 'Tous'" class="count">({{ recipes.length }})</span>
        </button>
      </div>

      <div class="sub-filters">
        <span>Temps max : <strong>&lt; 45 min</strong></span>
        <span>Difficulté : <strong>Tous niveaux ▼</strong></span>
      </div>
    </section>

    <hr class="separator" />

    <!-- États réseau -->
    <div v-if="loading" class="state-msg">Chargement des recettes...</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>
    <div v-else-if="filteredRecipes.length === 0" class="state-msg">
      Aucune recette trouvée pour votre recherche.
    </div>

    <!-- Grille de RecipeCards -->
    <div v-else class="recipe-grid">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @select="$emit('select-recipe', $event)"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import RecipeCard from './RecipeCard.vue';

const props = defineProps({
  recipes: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
  searchQuery: { type: String, default: '' }
});

defineEmits(['select-recipe']);

const selectedCategory = ref('Tous');
const categories = ['Tous', 'Pâtisserie', 'Plats chauds', 'En-cas'];

const filteredRecipes = computed(() => {
  return props.recipes.filter(recipe => {
    const matchesCat = selectedCategory.value === 'Tous' || recipe.category === selectedCategory.value;
    const matchesSearch = recipe.name.toLowerCase().includes(props.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
});
</script>

<style scoped>
.filters-section { margin: 1.25rem 0; }
.filter-group { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
.filter-label { font-weight: 700; font-size: 0.85rem; color: #4b5563; }

.filter-btn {
  background-color: #ffffff;
  border: 2px solid #374151;
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 0 #374151;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.2s ease, color 0.2s ease;
}
.filter-btn:hover { background-color: #f3f4f6; }
.filter-btn:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
.filter-btn:active { transform: translateY(2px); box-shadow: 0 0 0 #374151; }
.filter-btn.active {
  background-color: #1f2937;
  color: #ffffff;
  border-color: #111827;
  box-shadow: 0 1px 0 #111827;
}

.sub-filters { display: flex; gap: 1.5rem; font-size: 0.85rem; color: #6b7280; margin-top: 0.5rem; }
.separator { border: none; border-top: 2px dashed #9ca3af; margin: 1rem 0 1.5rem 0; }
.recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.state-msg { text-align: center; padding: 2.5rem; font-weight: 600; color: #6b7280; }
.state-msg.error { color: #dc2626; }

@media (prefers-reduced-motion: reduce) {
  .filter-btn:active { transform: none !important; }
}
</style>