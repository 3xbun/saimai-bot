<template>
  <div class="container">
    <div class="searchBar">
      <i class="fa-duotone fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="ค้นหาด้วยชื่อการ์ด"
        v-model="searchText"
      />
    </div>
    <Card
      v-if="selectedCard && showModal"
      :id="selectedCard.Id"
      :image="selectedCard.ImageLink"
      :title="selectedCard.Name"
      :series="selectedCard.Series"
      :artist="selectedCard.Artist"
      :rarity="selectedCard.Rarity"
      :print="selectedCard.Print"
    />
    <div class="cards">
      <div
        v-for="card in filterCards"
        class="card"
        :key="card.Id"
        @click="
          selectedCard = card;
          showModal = true;
        "
      >
        <img
          :class="{ lock: !isUnlock(card.Id) }"
          v-if="card.ImageLink"
          :src="
            'https://ndb.3xbun.com/' +
            card.ImageLink[0].thumbnails.card_cover.signedPath
          "
          alt=""
        />
        <img
          v-else
          src="https://placehold.co/400x600?text=COMING+SOON"
          alt=""
        />
        <p>{{ card.Name }}</p>
        <p class="print">{{ card.Print }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";

import Card from "../components/Card.vue";

const showModal = inject("showModal");
const Cards = inject("Cards");
const Collections = inject("Collections");

const searchText = ref("");
const selectedCard = ref();

const filterCards = computed(() => {
  return Cards.value.filter((c) => c.Name.startsWith(searchText.value));
});

const isUnlock = (id) => {
  if (Collections.value.filter((c) => c.id == id)[0]) {
    return true;
  } else {
    return false;
  }
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1em;
}

.card {
  width: 30%;
  text-align: center;
  background-color: var(--dark);
  padding: 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
}

.print {
  color: var(--gray);
  font-size: 0.8em;
}

.searchBar {
  background-color: var(--dark);
  border-radius: 0.5em;
  padding: 0.5em;
  display: flex;
  gap: 0.5em;
  align-items: center;
  margin-bottom: 1em;
}

.lock {
  filter: grayscale(100%) brightness(10%) blur(3px);
}

input {
  background: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  border: none;
  width: 100%;
}

input::placeholder,
i {
  color: var(--gray);
}
</style>
