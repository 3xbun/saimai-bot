<template>
  <div class="background">
    <div class="card">
      <img
        v-if="props.image"
        :src="'https://ndb.3xbun.com/' + props.image[0].path"
        alt=""
      />
      <img v-else src="https://placehold.co/400x600?text=COMING+SOON" alt="" />
      <div class="title">
        <h1>{{ props.title }}</h1>
        <h4>{{ props.series }}</h4>
      </div>
      <div class="control">
        <p @click="control(false)">-</p>
        <p v-if="amt == 0">ยังไม่มี</p>
        <p v-else>มีแล้ว {{ amt }} ใบ</p>
        <p @click="control(true)">+</p>
      </div>
      <a :href="tcgLink" class="tcg" target="_blank">
        <img src="/imgs/TCG.png" />
        <p>TCG Thailand</p>
        <p class="price" v-if="price">THB {{ price }}</p>
        <p class="price" v-else>-</p>
      </a>
      <hr />
      <div class="informations">
        <div class="item">
          <i
            data-v-984736c4=""
            class="icon fa-duotone fa-solid fa-pen-swirl"
          ></i>
          <div class="text">
            <p>Artist</p>
            <p>{{ props.artist }}</p>
          </div>
        </div>
        <div class="item">
          <i class="fa-duotone fa-solid fa-percent icon"></i>
          <div class="text">
            <p>Rarity</p>
            <p>{{ props.rarity }}</p>
          </div>
        </div>
        <div class="item">
          <i class="fa-duotone fa-solid fa-signature icon"></i>
          <div class="text">
            <p>Print</p>
            <p>{{ props.print }}</p>
          </div>
        </div>
      </div>
      <i
        class="fa-duotone fa-solid fa-circle-x close"
        @click="showModal = false"
      ></i>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, inject, onMounted, ref } from "vue";

const props = defineProps([
  "id",
  "image",
  "title",
  "artist",
  "rarity",
  "print",
  "series",
]);

const price = ref(0);
const tcgLink = ref("");
const isNew = ref(true);
const amt = ref(0);

const showModal = inject("showModal");
const Collections = inject("Collections");

const getPrice = (id) => {
  tcgLink.value =
    "https://www.tcgthailand.com/product?page=1&category%5B%5D=Battle%20of%20Talingchan&status=new&checkBuyList=false&checkSellList=false&search=" +
    id;
  const API = `https://api.tcgthailand.com/api/v1/home/product_popular?page=1&search=${id}&filter_product=new&filter_category=all&filter_set_name=all&filter_rarity=all&filter_accessory=all&filter_set_card=all&filter_buy_list=false&filter_sell_list=false`;
  axios.get(API).then((res) => {
    const data = res.data.order_item_data.data;
    if (data.length > 1) {
      try {
        if (data.filter((c) => c.rarity == props.rarity)[0].price_low) {
          price.value = data.filter(
            (c) => c.rarity == props.rarity
          )[0].price_low;
        }
      } catch (error) {}
    } else {
      price.value = data[0].price_low;
    }
  });
};

const control = (isAdd) => {
  if (isNew.value) {
    Collections.value.push({
      id: props.id,
      amt: 0,
    });

    isNew.value = false;
  }

  if (isAdd) {
    amt.value += 1;
  } else {
    if (amt.value > 0) {
      amt.value -= 1;
    }
  }

  Collections.value.filter((card) => card.id == props.id)[0].amt = amt.value;

  if (amt.value == 0) {
    Collections.value = Collections.value.filter((card) => card.id != props.id);
  }

  localStorage.setItem("Collections", JSON.stringify(Collections.value));
};

const owned = computed(() => {});

onMounted(() => {
  getPrice(props.print);

  // Check if card is new
  if (Collections.value.filter((card) => card.id == props.id)[0]) {
    amt.value = Collections.value.filter((card) => card.id == props.id)[0].amt;
    isNew.value = false;
  }
});
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  background-color: rgba(32, 33, 36, 0.1);
  backdrop-filter: blur(0.5em);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
}

.card {
  width: 95vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding: 1em;
  padding-bottom: 5vh;

  text-align: center;
  overflow: scroll;
}

.card div {
  width: 100%;
}

h4 {
  color: var(--gray);
}

.informations {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-size: 1em;
}

.item {
  background-color: var(--dark);
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  text-align: left;
  gap: 1em;
  padding: 0.5em 1em;
}

.icon {
  font-size: 2em;
}

.text p:first-child {
  color: var(--gray);
}

img {
  height: 40vh;
  width: auto;
}

.close {
  font-size: 2em;
  position: fixed;
  top: 1em;
  right: 1em;
}

.control {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}

.control p {
  background-color: var(--dark);
  border-radius: 0.5em;
  padding: 1em;
  text-align: center;
  width: 30%;
}

.control p:nth-child(2) {
  width: 100%;
}

.tcg {
  width: 100%;
  display: flex;
  background-color: var(--dark);
  border-radius: 0.5em;
  padding: 1em 1em;
  gap: 1em;
  justify-content: space-between;
}

.tcg img {
  width: 2.5em;
  height: auto;
}

.tcg p {
  width: 100%;
  text-align: left;
}

.price {
  text-align: right !important;
}

hr {
  width: 90%;
  border: 1px solid var(--dark);
}
</style>
