<script setup lang="ts">
import opt from "@/store"
import type { Option } from "@/types/option"

const keys: (keyof Option["type"])[] = ["cute", "cool", "passion"]

const props = defineProps<{
  toggleChecked: (e: MouseEvent) => void
}>()
</script>

<template>
  <li class="option-item">
    <h1 class="option-name">Type</h1>
    <template v-for="key in keys" :key="key">
      <input type="checkbox" :id="key" v-model="opt.type[key]" />
      <label
        class="option-label"
        :class="key"
        :for="key"
        @click="props.toggleChecked"
      >
        {{ key.toUpperCase().slice(0, 1) + key.slice(1) }}
      </label>
    </template>
  </li>
</template>
