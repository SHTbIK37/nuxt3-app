<template>
  <div>
    <h1>PHP Page</h1>
    <div v-html="phpContent"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const phpContent = ref("");
(async () => {
  console.log("check");
  try {
    const { data } = await useFetch("http://localhost:8000/test.php");
    console.log(data.value);
    phpContent.value = data.value; // Используйте text() для обработки HTML контента
  } catch (error) {
    console.error("Ошибка при загрузке данных с PHP сервера:", error);
    phpContent.value = "Ошибка при загрузке данных с PHP сервера";
  }
})();
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
