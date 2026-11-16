<template>
  <header class="main-header">
    <div class="brand" role="button" tabindex="0" @click="$emit('go-home')" @keydown.enter="$emit('go-home')">
      <span class="logo-icon" aria-hidden="true">🍰</span>
      <h1>CookingCraft</h1>
    </div>

    <div class="search-box">
      <label for="search-input" class="sr-only">Rechercher une recette</label>
      <input
        id="search-input"
        :value="modelValue"
        type="search"
        placeholder="Rechercher..."
        class="search-input"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="search-icon" aria-hidden="true">🔍</span>
    </div>
  </header>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' }
});
defineEmits(['update:modelValue', 'go-home']);
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1rem;
  gap: 1rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
}
.brand:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}
.logo-icon { font-size: 1.75rem; }
h1 { font-size: 1.5rem; margin: 0; font-weight: 800; color: #1f2937; }
.search-box { position: relative; display: flex; align-items: center; }
.search-input {
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.search-input:focus-visible {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
.search-icon { position: absolute; right: 0.75rem; pointer-events: none; }
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;
}
</style>