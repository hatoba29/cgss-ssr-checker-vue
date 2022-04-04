<script setup lang="ts">
import { ref } from "vue"
import opt from "@/store"
import OptType from "./OptType.vue"
import OptLimited from "./OptLimited.vue"
import OptName from "./OptName.vue"
import OptDisplay from "./OptDisplay.vue"

const isOpen = ref(false)

const toggleFilter = () => (isOpen.value = !isOpen.value)

const toggleChecked = (e: MouseEvent) => {
  const target = e.currentTarget as Element
  target.classList.toggle("checked")
}
</script>

<template>
  <header>✅&nbsp;CGSS SSR Checker</header>
  <button type="button" class="filter-btn" @click="toggleFilter">
    <v-icon name="io-filter-sharp" />
    Filter / Option
  </button>
  <div class="filters">
    <template v-for="(show, key) in opt.type" :key="key">
      <div class="filter-item" :class="key" v-if="show">type:{{ key }}</div>
    </template>
    <template v-for="(show, key) in opt.limited" :key="key">
      <div class="filter-item" v-if="show">gacha:{{ key }}</div>
    </template>
    <div class="filter-item" v-if="opt.cardName">card: {{ opt.cardName }}</div>
    <div class="filter-item" v-if="opt.idolName">idol: {{ opt.idolName }}</div>
  </div>
  <Transition>
    <ul v-if="isOpen" class="options">
      <OptType :toggle-checked="toggleChecked" />
      <OptLimited :toggle-checked="toggleChecked" />
      <OptName />
      <OptDisplay :toggle-checked="toggleChecked" />
    </ul>
  </Transition>
</template>

<style lang="scss" scoped>
* {
  /* type color */
  --cute: #f6006e;
  --cool: #036bfb;
  --passion: #fbb127;
}

header {
  height: 36px;
  margin-top: 12px;
  padding: 0 8px;

  display: flex;
  align-items: center;

  font-size: 20px;
  font-weight: 700;
}

.filter-btn {
  margin: 10px 8px;
  border: 1px solid black;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  font-size: 16px;
  font-weight: bold;

  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
}

.filters {
  margin: 4px 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .filter-item {
    height: 26px;
    margin: 4px;
    border-radius: 13px;
    padding: 0 10px;
    background-color: #528bff;
    user-select: none;

    color: white;
    font-size: 12px;
    line-height: 24px;

    &.cute {
      background-color: var(--cute);
    }
    &.cool {
      background-color: var(--cool);
    }
    &.passion {
      background-color: var(--passion);
    }
  }
}

.options {
  height: 180px;
  margin: 8px 12px;
  overflow: hidden;

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  &.v-enter-active,
  &.v-leave-active {
    transition: height 0.5s ease, margin 0.5s ease-out;
  }

  &.v-enter-from,
  &.v-leave-to {
    height: 0;
    margin: 0 12px;
  }
}

:deep(.option-item) {
  display: flex;
  flex-direction: column;
}

:deep(.option-name) {
  margin: unset;
  margin-bottom: 10px;

  font-size: 16px;
  font-weight: bold;
}

:deep(.option-label) {
  width: fit-content;
  margin: 4px 0;
  border-radius: 16px;
  padding: 4px 12px;
  background-color: #c8c8c8;

  cursor: pointer;
  user-select: none;

  color: white;
  font-size: 16px;
  line-height: 1.4rem;

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }

  &.checked {
    &.cute {
      background-color: var(--cute);
    }
    &.cool {
      background-color: var(--cool);
    }
    &.passion {
      background-color: var(--passion);
    }

    background-color: #528bff;
  }
}

:deep(input[type="text"]) {
  width: 200px;
  height: 28px;
  border: none;
  border-bottom: 2px solid black;

  &:focus {
    outline: none;
  }
}

:deep(input[type="checkbox"]) {
  display: none;
}
</style>
