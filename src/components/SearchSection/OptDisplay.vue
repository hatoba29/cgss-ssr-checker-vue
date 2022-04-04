<script setup lang="ts">
import opt from "@/store"

const props = defineProps<{
  toggleChecked: (e: MouseEvent) => void
}>()
</script>

<template>
  <li class="option-item">
    <h1 class="option-name">Display Option</h1>
    <input type="checkbox" id="showName" v-model="opt.showName" />
    <label
      class="option-label checked"
      for="showName"
      @click="props.toggleChecked"
    >
      Show Card Name
    </label>
    <input type="checkbox" id="awaken" v-model="opt.awaken" />
    <label
      class="option-label checked"
      for="awaken"
      @click="props.toggleChecked"
    >
      Awaken
    </label>
  </li>
</template>
