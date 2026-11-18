<!-- src/components/HungerBar.vue -->
<template>
  <div
    class="hunger-bar-container"
    :class="`size-${size}`"
    role="meter"
    :aria-valuenow="points"
    aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="`Faim : ${points} sur ${max}`"
  >
    <span v-if="showLabel" class="hunger-label">Faim :</span>

    <div class="drumsticks-track">
      <div
        v-for="index in max"
        :key="index"
        class="drumstick-wrapper"
        :class="{
          'is-full': index <= points,
          'is-empty': index > points,
          'is-pulsing': points >= 7 && index <= points
        }"
        :style="{ '--delay': `${index * 0.04}s` }"
      >
        <!-- SVG GÉNÉRÉ AUTOMATIQUEMENT DEPUIS LA GRILLE -->
        <svg
          class="drumstick-svg"
          viewBox="0 0 9 9"
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="crispEdges"
          aria-hidden="true"
        >
          <rect
            v-for="pixel in pixels"
            :key="`${pixel.x}-${pixel.y}`"
            :x="pixel.x"
            :y="pixel.y"
            width="1"
            height="1"
            :class="index <= points ? pixel.fullClass : pixel.emptyClass"
          />
        </svg>
      </div>
    </div>

    <span v-if="showLabel" class="points-text">({{ points }}/{{ max }})</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineProps({
  points: {
    type: Number,
    required: true,
    validator: (v) => v >= 0 && v <= 10
  },
  max: {
    type: Number,
    default: 10
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium'].includes(v)
  }
});

/* ==========================================================================
   ÉDITEUR DE PIXEL-ART LISIBLE (Grille 9x9)
   Modifiez simplement une lettre pour changer un pixel !
   
   Légende :
   '.' = Transparent (vide)
   'B' = Noir (Contour)
   'R' = Rouge vif
   'H' = Blanc brillant (Reflet animé en S3)
   'W' = Blanc (Os)
   'D' = Brun foncé
   'L' = Brun clair
   'M' = Brun moyen
   ========================================================================== */
const pixelGrid = [
// Col: 012345678
       '.....BB..', // Ligne 0
       '....BRRB.', // Ligne 1
       '...BDRHRB', // Ligne 2
       '..BDLMRRB', // Ligne 3
       '..BLMMMB.', // Ligne 4
       '..BLLMB..', // Ligne 5
       'BBWBBB...', // Ligne 6
       'BWB......', // Ligne 7
       '.BB......'  // Ligne 8
];

// Correspondance entre la lettre et les classes CSS (plein vs vide)
const colorMap = {
  B: { full: 'px-black',       empty: 'px-empty-border' },
  R: { full: 'px-red',         empty: 'px-empty-fill'   },
  H: { full: 'px-white highlight-anim', empty: 'px-empty-fill' },
  W: { full: 'px-white',       empty: 'px-empty-bone'   },
  D: { full: 'px-dark-brown',  empty: 'px-empty-fill'   },
  L: { full: 'px-light-brown', empty: 'px-empty-fill'   },
  M: { full: 'px-mid-brown',   empty: 'px-empty-fill'   }
};

// Transforme la grille ci-dessus en coordonnées (x, y) pour les <rect> du SVG
const pixels = computed(() => {
  const list = [];
  pixelGrid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      if (char !== '.' && colorMap[char]) {
        list.push({
          x,
          y,
          fullClass: colorMap[char].full,
          emptyClass: colorMap[char].empty
        });
      }
    }
  });
  return list;
});
</script>

<style scoped>
.hunger-bar-container {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
}

.hunger-label {
  font-weight: 800;
  font-size: 0.9rem;
  color: #1f2937;
}

.points-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748b;
  margin-left: 0.25rem;
}

.drumsticks-track {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.size-small .drumstick-svg {
  width: 18px;
  height: 18px;
}

.size-medium .drumstick-svg {
  width: 24px;
  height: 24px;
}

/* Couleurs faciles à modifier */
.px-black       { fill: #1e1e1e; }
.px-red         { fill: #ee1c24; }
.px-white       { fill: #ffffff; }
.px-dark-brown  { fill: #8a4214; }
.px-light-brown { fill: #c97f3b; }
.px-mid-brown   { fill: #9c6339; }

/* Couleurs pour la version vide (silhouette) */
.px-empty-border { fill: #334155; opacity: 0.28; }
.px-empty-fill   { fill: #94a3b8; opacity: 0.18; }
.px-empty-bone   { fill: #cbd5e1; opacity: 0.35; }

/* ==========================================================================
   ANIMATIONS S3
   ========================================================================== */
.drumstick-wrapper.is-full .drumstick-svg {
  animation: shank-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: var(--delay);
}

.highlight-anim {
  animation: shine 1.6s ease-in-out infinite alternate;
  animation-delay: var(--delay);
}

.drumstick-wrapper.is-pulsing:hover .drumstick-svg {
  animation: mc-shake 0.25s ease-in-out infinite alternate;
}

@keyframes shank-pop {
  0% { transform: scale(0.3) translateY(4px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes shine {
  0% { opacity: 0.45; }
  100% { opacity: 1; }
}

@keyframes mc-shake {
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(1px); }
}

@media (prefers-reduced-motion: reduce) {
  .drumstick-svg,
  .highlight-anim {
    animation: none !important;
  }
}
</style>