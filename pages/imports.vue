<template>
  <div>Dynamic import</div>
  <div :style="bodyStyle" v-html="bodyContent"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const bodyStyle = ref("");
const bodyContent = ref("");
const jsLinks = ref("");
const cssLinks = ref("");

const loadContent = async () => {
  const response = await useFetch("/api/hello"); // Запрос для получения данных
  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data.value.html, "text/html");

  // Извлекаем содержимое head
  // const headContent = doc.head.innerHTML;
  const bodyContentRaw = doc.body.innerHTML;

  // Добавляем содержимое head в текущий документ
  // document.head.innerHTML += headContent;

  // Обновляем содержимое body в компоненте
  bodyContent.value = bodyContentRaw;

  jsLinks.value = response.data.value.jsLinks;
  cssLinks.value = response.data.value.cssLinks;

  // Динамически подключаем CSS-файл

  const importedModuleCss = await import(`./${cssLinks.value}.ts`);
  bodyStyle.value = importedModuleCss.ButtonStyle;
  // Динамически импортируем JS-файл
  const importedModule = await import(`./${jsLinks.value}.js`);

  // Подключаем все экспортированные функции к глобальному контексту
  Object.keys(importedModule).forEach((key) => {
    window[key] = importedModule[key];
  });
};

onMounted(() => {
  loadContent();
});
</script>

<style scoped>
/* Добавь стили, если необходимо */
</style>
