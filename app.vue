<script setup>
console.log("app.vue");
</script>

<template>
  <div>
    <header>
      <NuxtLink to="/">
        <button>Home</button>
      </NuxtLink>
      <NuxtLink to="/page1">
        <button>Go to Page 1</button>
      </NuxtLink>
      <NuxtLink to="/page2">
        <button>Go to Page 2</button>
      </NuxtLink>
    </header>
    <NuxtPage />
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
