<script setup lang="ts">
import opt from "@/store"
</script>

<template>
  <li class="option-item">
    <h1 class="option-name">Card Name</h1>
    <input type="text" v-model="opt.cardName" />
  </li>
  <li class="option-item">
    <h1 class="option-name">Idol Name</h1>
    <input type="text" v-model="opt.idolName" />
  </li>
</template>
