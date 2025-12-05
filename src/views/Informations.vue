<template>
  <div>
    <div id="changelog"></div>
    <hr />
    <p>
      Made with
      <i style="color: var(--primary)" class="fa-solid fa-heart"></i>
      in Sai Mai, BKK by
      <a style="text-decoration: underline" href="https://3xbun.com">3xbun</a>.
    </p>
    <hr />
    <p>
      ข้อความและรูปภาพที่เกี่ยวข้องกับ Battle of Talingchan
      รวมถึงภาพการ์ดทั้งหมด เป็นลิขสิทธิ์ของ บริษัท พสุโลล จำกัด และบริษัท
      ไลอ้อน เฮ้าส์ จำกัด ผู้ถือลิขสิทธิ์อย่างเป็นทางการของ Battle of Talingchan
      <br />
      เว็บไซต์ SAI MAI เป็นเว็บไซต์ที่จัดทำโดยบุคคลที่สาม มิได้จัดทำ
      ได้รับการรับรอง สนับสนุน หรือมีความเกี่ยวข้องกับ บริษัท พสุโลล จำกัด
      บริษัท ไลอ้อน เฮ้าส์ จำกัด หรือผู้ถือลิขสิทธิ์รายอื่นของ Battle of
      Talingchan แต่อย่างใด
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { marked } from "marked";
import { onMounted, ref } from "vue";

const changelog = ref("");

onMounted(() => {
  axios.get("/CHANGELOG.md").then((res) => {
    console.log(res.data);

    changelog.value = res.data;
    document.getElementById("changelog").innerHTML = marked.parse(res.data);
  });
});
</script>

<style scoped>
div {
  text-align: center;
  color: var(--gray);
  padding-bottom: 2em;
}

hr {
  margin: 1em;
  width: 90%;
  border: 1px solid var(--dark);
}

#changelog {
  text-align: left;
}
</style>
