<template>
  <article
    class="recipe-card"
    tabindex="0"
    role="button"
    :aria-label="`Voir la recette : ${recipe.name}`"
    @click="$emit('select', recipe)"
    @keydown.enter="$emit('select', recipe)"
    @keydown.space.prevent="$emit('select', recipe)"
  >
    <div class="card-image-box">
      <span class="pixel-food-icon">{{ getIcon(recipe.id) }}</span>
    </div>

    <div class="card-content">
      <h2 class="card-title">{{ recipe.name }}</h2>
      <p class="card-meta">
        <span>Tag: {{ recipe.category }}</span> •
        <span>⏱️ {{ recipe.prepTime }} min</span> •
        <span>{{ recipe.difficulty }}</span>
      </p>

      <div class="hunger-bar" aria-label="Points de faim">
        <span class="hunger-label">Faim :</span>
        <span class="hunger-icons">{{ '🍗'.repeat(recipe.hungerPoints || 5) }}</span>
      </div>

      <div class="card-action">
        <span class="action-text">Voir la recette</span>
        <span class="action-arrow" aria-hidden="true">→</span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  recipe: { type: Object, required: true }
});
defineEmits(['select']);

function getIcon(id) {
  if (id.includes('cake')) return '🎂';
  if (id.includes('stew')) return '🍲';
  if (id.includes('pie')) return '🥧';
  if (id.includes('apple')) return '🍏';
  return '🍞';
}
</script>

<style scoped>
.recipe-card {
  background: #ffffff;
  border: 2px solid #374151;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 0 #374151;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 0 #111827;
  border-color: #111827;
}

.recipe-card:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 4px;
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #111827;
}

.card-image-box {
  background: #f3f4f6;
  border-radius: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}
.pixel-food-icon { font-size: 3.5rem; }
.card-title { font-size: 1.1rem; margin: 0 0 0.4rem 0; font-weight: 700; color: #111827; }
.card-meta { font-size: 0.8rem; color: #6b7280; margin: 0 0 0.5rem 0; }
.hunger-bar { display: flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; margin-bottom: 0.75rem; }

.card-action {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  font-weight: 700;
  font-size: 0.85rem;
  color: #2563eb;
}

.action-arrow {
  transition: transform 0.2s ease;
}

.recipe-card:hover .action-arrow,
.recipe-card:focus-visible .action-arrow {
  transform: translateX(5px);
}

@media (prefers-reduced-motion: reduce) {
  .recipe-card, .recipe-card:hover, .recipe-card:focus-visible, .action-arrow {
    transform: none !important;
    transition-duration: 0.01ms !important;
    box-shadow: 0 4px 0 #374151 !important;
  }
}
</style>