<template>
  <div class="card">
    <img src="https://placehold.co/400x600" alt="" />
    <div class="title">
      <h1>{{ props.title }}</h1>
      <h4>{{ props.series }}</h4>
    </div>
    <div class="informations">
      <p>Artist: {{ props.artist }}</p>
      <p>Rarity: {{ props.rarity }}</p>
      <p>Print: {{ props.print }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["title", "artist", "rarity", "print", "series"]);
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding-top: 2em;
  padding-bottom: 15vh;
  background-color: var(--black);
  -webkit-backdrop-filter: blur(1em);
  backdrop-filter: blur(1em);
  border: 1solid red;
}
</style>
