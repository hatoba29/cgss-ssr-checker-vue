<script setup lang="ts">
import CardSection from "./components/CardSection.vue"
import SearchBar from "./components/SearchSection/index.vue"
</script>

<template>
  <SearchBar />
  <CardSection />
</template>

<style lang="scss">
@import "./assets/base.css";
@import "./assets/normalize.css";

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
