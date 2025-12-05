<template>
  <header>
    <div class="container">
      <router-link to="/">
        <img
          src="https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/1f36c.svg"
          class="logo"
        />
      </router-link>
      <router-link class="title" to="/">
        <h1>SAI MAI</h1>
      </router-link>
      <router-link to="/info">
        <i class="fa-duotone fa-solid fa-circle-info"></i>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const feature = ref();
</script>

<style lang="css" scoped>
.container {
  margin: 0 auto;
  padding: 1em 0;
  display: flex;
  align-items: center;
  gap: 1em;
}
header {
  background-color: var(--primary);
  width: 100vw;
}

.logo {
  width: 3em;
}

i {
  font-size: 1.5em;
}

.title {
  flex-grow: 2;
}
</style>
