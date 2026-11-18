<template>
  <main class="detail-view">
    <!-- Bouton de retour -->
    <button
      class="back-btn"
      type="button"
      @click="$emit('back')"
    >
      ← Retour au grimoire
    </button>

    <!-- En-tête de la recette -->
    <header class="detail-header">
      <h2 class="recipe-name">{{ recipe.name }}</h2>

      <div class="detail-meta">
        <span>Tag: <strong>{{ recipe.category }}</strong></span> •
        <span>⏱️ {{ recipe.prepTime }} min</span> •
        <span>{{ recipe.difficulty }}</span> •
        <!-- Jauge SVG intégrée au format medium -->
        <HungerBar
          :points="recipe.hungerPoints || 5"
          :max="10"
          :show-label="true"
          size="medium"
        />
      </div>
    </header>

    <!-- SECTION 1 : Établi Minecraft 3x3 -->
    <section class="workbench-section" aria-label="Table de craft Minecraft">
      <h3 class="section-title">Table de craft (3x3)</h3>

      <div class="crafting-area">
        <!-- Grille 3x3 -->
        <div class="grid-3x3" role="grid" aria-label="Grille d'artisanat 3 par 3">
          <div
            v-for="(slot, index) in recipe.minecraftGrid"
            :key="index"
            class="craft-slot"
            tabindex="0"
            :title="slot ? formatSlotName(slot) : 'Case vide'"
          >
            <span v-if="slot" class="slot-item">{{ getSlotIcon(slot) }}</span>
          </div>
        </div>

        <!-- Flèche de transformation -->
        <div class="craft-arrow" aria-hidden="true">➔</div>

        <!-- Case de résultat du craft -->
        <div
          class="craft-result-slot"
          tabindex="0"
          :title="`Plat obtenu : ${recipe.name}`"
        >
          <span class="result-item">{{ getFoodIcon(recipe.id) }}</span>
        </div>
      </div>
    </section>

    <!-- SECTION 2 : Vraie Cuisine (Ingrédients réels & Préparation) -->
    <section class="real-cooking-section" aria-label="Recette réelle">
      <div class="cooking-grid">
        <!-- Colonne Ingrédients -->
        <div class="ingredients-column">
          <h3 class="section-title">Ingrédients réels</h3>
          <p class="section-hint">Cochez vos ingrédients au fur et à mesure :</p>

          <ul class="ingredients-list">
            <li
              v-for="(ing, idx) in recipe.realIngredients"
              :key="idx"
              class="ingredient-item"
            >
              <label class="checkbox-label">
                <input type="checkbox" class="ingredient-checkbox" />
                <span class="ingredient-text">{{ ing }}</span>
              </label>
            </li>
          </ul>
        </div>

        <!-- Colonne Étapes -->
        <div class="directions-column">
          <h3 class="section-title">Directions (Étapes de préparation)</h3>

          <ol class="steps-list">
            <li
              v-for="(step, idx) in recipe.steps"
              :key="idx"
              class="step-card"
            >
              <h4 class="step-badge">STEP {{ idx + 1 }}</h4>
              <p class="step-instruction">{{ step }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import HungerBar from './HungerBar.vue';

defineProps({
  recipe: {
    type: Object,
    required: true
  }
});

defineEmits(['back']);

function getFoodIcon(id) {
  if (id.includes('cake')) return '🎂';
  if (id.includes('stew')) return '🍲';
  if (id.includes('pie')) return '🥧';
  if (id.includes('apple')) return '🍏';
  return '🍞';
}

function getSlotIcon(slug) {
  const map = {
    milk_bucket: '🥛',
    sugar: '🍬',
    egg: '🥚',
    wheat: '🌾',
    bowl: '🥣',
    red_mushroom: '🍄',
    brown_mushroom: '🍄',
    cornflower: '🌸',
    apple: '🍎',
    gold_ingot: '🪙',
    pumpkin: '🎃'
  };
  return map[slug] || '📦';
}

function formatSlotName(slug) {
  return slug ? slug.replace('_', ' ') : '';
}
</script>

<style scoped>
.detail-view {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Bouton de retour */
.back-btn {
  background: #ffffff;
  border: 2px solid #374151;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  color: #1f2937;
  cursor: pointer;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 0 #374151;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease;
}

.back-btn:hover {
  background: #f3f4f6;
}

.back-btn:active {
  transform: translateY(2px);
  box-shadow: 0 0 0 #374151;
}

.back-btn:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

/* En-tête */
.detail-header {
  margin-bottom: 1.5rem;
}

.recipe-name {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.detail-meta {
  color: #4b5563;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
}

/* SECTION TABLE DE CRAFT */
.workbench-section {
  background: #e5e7eb;
  border: 3px solid #374151;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 0 #374151;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1rem 0;
}

.crafting-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
}

.grid-3x3 {
  display: grid;
  grid-template-columns: repeat(3, 58px);
  grid-template-rows: repeat(3, 58px);
  gap: 4px;
  background: #8b8b8b;
  padding: 6px;
  border: 3px solid #374151;
  border-radius: 4px;
}

.craft-slot,
.craft-result-slot {
  background: #8f8f8f;
  border: 2px inset #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.85rem;
  cursor: default;
  transition: transform 0.1s ease;
}

.craft-slot:focus-visible,
.craft-result-slot:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 1px;
}

.craft-slot:hover {
  filter: brightness(1.1);
}

.craft-result-slot {
  width: 76px;
  height: 76px;
  background: #c6c6c6;
  border: 3px solid #374151;
  border-radius: 6px;
  box-shadow: 0 3px 0 #374151;
}

.result-item {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.craft-arrow {
  font-size: 2.2rem;
  color: #4b5563;
  user-select: none;
}

/* SECTION VRAIE CUISINE */
.real-cooking-section {
  background: #ffffff;
  border: 2px solid #374151;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 0 #374151;
}

.cooking-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .cooking-grid {
    grid-template-columns: 1fr;
  }
}

.section-hint {
  font-size: 0.85rem;
  color: #6b7280;
  margin: -0.5rem 0 1rem 0;
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredient-item {
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e5e7eb;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #374151;
}

.ingredient-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #22c55e;
  cursor: pointer;
}

/* Ligne barrée fluide quand l'ingrédient est pesé */
.ingredient-checkbox:checked + .ingredient-text {
  text-decoration: line-through;
  color: #9ca3af;
  transition: color 0.15s ease;
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #3b82f6;
  border-radius: 6px;
  padding: 0.85rem 1rem;
}

.step-badge {
  margin: 0 0 0.35rem 0;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: #2563eb;
  font-weight: 800;
}

.step-instruction {
  margin: 0;
  font-size: 0.95rem;
  color: #1f2937;
  line-height: 1.45;
}

@media (prefers-reduced-motion: reduce) {
  .detail-view {
    animation: none !important;
  }
  .back-btn:active {
    transform: none !important;
  }
}
</style>