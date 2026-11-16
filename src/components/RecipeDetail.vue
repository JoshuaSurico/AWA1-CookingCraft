<template>
  <main class="detail-view">
    <button class="back-btn" @click="$emit('back')">
      ← Retour au grimoire
    </button>

    <header class="detail-header">
      <h2>{{ recipe.name }}</h2>
      <div class="detail-meta">
        <span>Tag: {{ recipe.category }}</span> •
        <span>⏱️ {{ recipe.prepTime }} min</span> •
        <span>{{ recipe.difficulty }}</span> •
        <span>Faim : {{ '🍗'.repeat(recipe.hungerPoints || 5) }}</span>
      </div>
    </header>

    <!-- Établi Minecraft 3x3 -->
    <section class="workbench-section">
      <div class="crafting-area">
        <div class="grid-3x3">
          <div
            v-for="(slot, index) in recipe.minecraftGrid"
            :key="index"
            class="craft-slot"
            tabindex="0"
            :title="slot || 'Vide'"
          >
            <span v-if="slot" class="slot-item">{{ getSlotIcon(slot) }}</span>
          </div>
        </div>

        <div class="craft-arrow" aria-hidden="true">➔</div>

        <div class="craft-result-slot" tabindex="0" title="Plat terminé">
          <span class="result-item">{{ getFoodIcon(recipe.id) }}</span>
        </div>
      </div>
    </section>

    <!-- Ingrédients réels & Étapes -->
    <section class="real-cooking-section">
      <h3>Ingrédients réels (Plan de travail)</h3>
      <ul class="ingredients-list">
        <li v-for="(ing, idx) in recipe.realIngredients" :key="idx" class="ingredient-item">
          <label class="checkbox-label">
            <input type="checkbox" class="ingredient-checkbox" />
            <span>{{ ing }}</span>
          </label>
        </li>
      </ul>

      <h3>Directions (Étapes de préparation)</h3>
      <ol class="steps-list">
        <li v-for="(step, idx) in recipe.steps" :key="idx" class="step-card">
          <h4>STEP {{ idx + 1 }}</h4>
          <p>{{ step }}</p>
        </li>
      </ol>
    </section>
  </main>
</template>

<script setup>
defineProps({
  recipe: { type: Object, required: true }
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
    milk_bucket: '🥛', sugar: '🍬', egg: '🥚', wheat: '🌾',
    bowl: '🥣', red_mushroom: '🍄', brown_mushroom: '🍄',
    cornflower: '🌸', apple: '🍎', gold_ingot: '🪙', pumpkin: '🎃'
  };
  return map[slug] || '📦';
}
</script>

<style scoped>
.back-btn {
  background: #f3f4f6;
  border: 2px solid #374151;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.15s ease;
}
.back-btn:hover { background: #e5e7eb; }
.back-btn:focus-visible { outline: 3px solid #2563eb; }

.detail-header h2 { font-size: 1.75rem; margin: 0 0 0.5rem 0; color: #111827; }
.detail-meta { color: #6b7280; font-size: 0.9rem; margin-bottom: 1.5rem; }

.workbench-section {
  background: #e5e7eb;
  border: 3px solid #374151;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}
.crafting-area { display: flex; align-items: center; justify-content: center; gap: 1.5rem; }
.grid-3x3 {
  display: grid;
  grid-template-columns: repeat(3, 56px);
  grid-template-rows: repeat(3, 56px);
  gap: 4px;
  background: #8b8b8b;
  padding: 6px;
  border: 3px solid #374151;
}
.craft-slot, .craft-result-slot {
  background: #8f8f8f;
  border: 2px inset #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
}
.craft-slot:focus-visible, .craft-result-slot:focus-visible { outline: 3px solid #fbbf24; }
.craft-result-slot { width: 72px; height: 72px; background: #c6c6c6; border: 3px solid #374151; }
.craft-arrow { font-size: 2rem; color: #4b5563; }

.ingredients-list { list-style: none; padding: 0; margin-bottom: 2rem; }
.ingredient-item { padding: 0.4rem 0; }
.checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
.steps-list { padding-left: 1.25rem; }
.step-card { margin-bottom: 1rem; }
.step-card h4 { margin: 0 0 0.25rem 0; color: #374151; }
.step-card p { margin: 0; color: #4b5563; }
</style>