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
    <!-- Vignette / Illustration de l'aliment -->
    <div class="card-image-box">
      <span class="pixel-food-icon">{{ getIcon(recipe.id) }}</span>
    </div>

    <!-- Contenu texte et métadonnées -->
    <div class="card-content">
      <h2 class="card-title">{{ recipe.name }}</h2>

      <p class="card-meta">
        <span class="tag-badge">Tag: {{ recipe.category }}</span> •
        <span>⏱️ {{ recipe.prepTime }} min</span> •
        <span>{{ recipe.difficulty }}</span>
      </p>

      <!-- Jauge de faim SVG (Semaine 3) -->
      <div class="hunger-wrapper">
        <HungerBar
          :points="recipe.hungerPoints || 5"
          :max="10"
          :show-label="true"
          size="small"
        />
      </div>

      <!-- Action avec flèche animée (Semaine 2) -->
      <div class="card-action">
        <span class="action-text">Voir la recette</span>
        <span class="action-arrow" aria-hidden="true">→</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import HungerBar from './HungerBar.vue';

defineProps({
  recipe: {
    type: Object,
    required: true
  }
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
/* ==========================================================================
   INTERACTION CSS 1 : Carte de recette interactive
   Problème UX : Indique clairement la cible sélectionnée et guide vers l'action.
   ========================================================================== */
.recipe-card {
  background: #ffffff;
  border: 2px solid #374151;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 0 #374151;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
}

/* Élévation au survol souris */
.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 0 #111827;
  border-color: #111827;
}

/* Navigation Clavier accessible */
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
  margin-bottom: 0.85rem;
  border: 1px solid #e5e7eb;
}

.pixel-food-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.12));
}

.card-title {
  font-size: 1.15rem;
  margin: 0 0 0.4rem 0;
  font-weight: 700;
  color: #111827;
}

.card-meta {
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0 0 0.6rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-badge {
  color: #374151;
  font-weight: 600;
}

.hunger-wrapper {
  margin: 0.25rem 0 0.85rem 0;
}

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

/* Micro-interaction de la flèche qui glisse */
.action-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.recipe-card:hover .action-arrow,
.recipe-card:focus-visible .action-arrow {
  transform: translateX(5px);
}

/* Accessibilité pour les utilisateurs sensibles au mouvement */
@media (prefers-reduced-motion: reduce) {
  .recipe-card,
  .recipe-card:hover,
  .recipe-card:focus-visible,
  .action-arrow {
    transform: none !important;
    transition-duration: 0.01ms !important;
    box-shadow: 0 4px 0 #374151 !important;
  }
}
</style>