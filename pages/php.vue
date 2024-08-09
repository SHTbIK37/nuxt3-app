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
  const { data } = await useFetch("/api/hello");
  const { html, js, cssLinks, jsLinks } = data.value;
  console.log(js);
  phpContent.value = html;
})();
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
