<template>
  <p>hello</p>
  <div ref="shadowHost"></div>
  <!-- Элемент-хост для Shadow DOM -->
</template>

<script setup>
import { ref, onMounted } from "vue";

const shadowHost = ref(null);

const loadContent = async () => {
  const response = await useFetch("/api/hello"); // Запрос для получения данных
  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data.value.html, "text/html");

  const bodyContentRaw = doc.body.innerHTML;
  const cssLinks = response.data.value.cssLinks;
  const jsLinks = response.data.value.jsLinks;

  const shadowRoot = shadowHost.value.attachShadow({ mode: "open" });

  // Вставляем содержимое body в Shadow DOM
  shadowRoot.innerHTML = bodyContentRaw;
  const importedModuleCss = await import(`${cssLinks}.css`);

  // Динамически импортируем JS-файл и выполняем его в контексте Shadow DOM
  const importedModule = await import(`${jsLinks}.js`);
  Object.keys(importedModule).forEach((key) => {
    window[key] = importedModule[key];
  });

  // Динамически подключаем CSS-файлы внутри Shadow DOM
  // const styleElement = document.createElement("link");
  // styleElement.rel = "stylesheet";
  // styleElement.href = `${cssLinks[0]}`;
  // shadowRoot.appendChild(styleElement);
};

onMounted(() => {
  loadContent();
});
</script>

<style scoped>
/* Добавь стили, если необходимо */
</style>
