<script setup>
console.log("app.vue");
</script>

<template>
  <div>
    <header>
      <NuxtLink to="/">
        <button>Home</button>
      </NuxtLink>
      <NuxtLink to="/imports">
        <button>imports</button>
      </NuxtLink>
      <NuxtLink to="/ecars">
        <button>ecars</button>
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
