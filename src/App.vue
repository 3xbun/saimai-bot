<template>
  <div class="container">
    <div class="cards">
      <div v-for="card in cards" class="card" :key="card.Id">
        <img
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
import axios from "axios";
import { onMounted, ref } from "vue";

import Card from "./components/Card.vue";

const cards = ref([]);

onMounted(() => {
  const options = {
    method: "GET",
    url: "https://ndb.3xbun.com/api/v2/tables/m5ft8mrsme12ias/records",
    params: {
      offset: "0",
      limit: "9999",
      where: "",
      viewId: "vwwq7w7rocrjfb8m",
    },
    headers: {
      "xc-token": "OZVzrIsuZwdymrGe7U2yfGImAHI4Rtp_HmTYP3Ib",
    },
  };

  axios
    .request(options)
    .then((res) => {
      cards.value = res.data.list;
    })
    .catch((err) => console.error(err));
});
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1em;
}

.card {
  width: 17%;
  text-align: center;
}

.print {
  color: var(--gray);
  font-size: 0.8em;
}
</style>
