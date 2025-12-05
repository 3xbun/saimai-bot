<template>
  <Header />
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, provide, ref } from "vue";

import Header from "./components/Header.vue";

const Cards = ref([]);
const Collections = ref([]);
const showModal = ref(false);

provide("Collections", Collections);
provide("Cards", Cards);
provide("showModal", showModal);

onMounted(() => {
  const col = localStorage.getItem("Collections");

  if (col) {
    Collections.value = JSON.parse(col);
  } else {
    localStorage.setItem("Collections", JSON.stringify(Collections.value));
  }

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
      Cards.value = res.data.list;
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
