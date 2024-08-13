<template>
  <p>dynamic imports</p>
  <div ref="shadowHost"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const shadowHost = ref(null);

const loadContent = async () => {
  const response = await useFetch("/api/hello");

  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data.value.html, "text/html");

  const bodyContentRaw = doc.body.innerHTML;
  const cssCode = response.data.value.cssCode;
  const jsCode = response.data.value.jsCode;

  const shadowRoot = shadowHost.value.attachShadow({ mode: "open" });

  // Вставляем содержимое body в Shadow DOM
  shadowRoot.innerHTML = bodyContentRaw;

  // Вставляем CSS в Shadow DOM

  for (const css of cssCode) {
    const styleTag = document.createElement("style");
    styleTag.textContent = css;
    shadowRoot.appendChild(styleTag);
  }

  // Выполняем JS код в контексте Shadow DOM
  for (const js of jsCode) {
    const scriptTag = document.createElement("script");
    scriptTag.textContent = js;
    shadowRoot.appendChild(scriptTag);
  }
};

onMounted(() => {
  loadContent();
});
</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>
