<script setup lang="ts">
import { ref } from "vue"

import OptType from "./OptType.vue"
import OptLimited from "./OptLimited.vue"
import OptName from "./OptName.vue"
import OptDisplay from "./OptDisplay.vue"

const isOpen = ref(false)

const showSearch = () => {
  isOpen.value = !isOpen.value
}

const toggleChecked = (e: MouseEvent) => {
  const target = e.currentTarget as Element
  target.classList.toggle("checked")
}
</script>

<template>
  <section :class="{ open: isOpen }">
    <button class="opener" @click="showSearch">
      <v-icon name="io-chevron-up-sharp" id="arrow" :class="{ open: isOpen }" />
    </button>

    <ul class="options">
      <OptType :toggle-checked="toggleChecked" />
      <OptLimited :toggle-checked="toggleChecked" />
      <OptName />
      <OptDisplay :toggle-checked="toggleChecked" />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: fixed;
  bottom: -340px;
  width: 100%;
  background-color: white;

  &.open {
    animation: open 0.7s ease-out forwards;
  }
  &.close {
    animation: close 0.7s ease-out forwards;
  }

  @keyframes open {
    0% {
      bottom: -340px;
    }
    100% {
    bottom: 0;
    }
  }
  @keyframes close {
    0% {
      bottom: 0;
    }
    100% {
      bottom: -340px;
    }
  }
}

.opener {
  width: 100%;
  height: 48px;
  border: none;
  background-color: white;
  box-shadow: 0 -5px 10px -5px black;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  #arrow.open {
    animation: arrowOpen 0.3s ease-out forwards;
  }
  #arrow.close {
    animation: arrowClose 0.3s ease-out forwards;
  }

  @keyframes arrowOpen {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  @keyframes arrowClose {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0);
    }
  }
}

.options {
  height: 340px;
  margin: 0 8px;
}

:deep(.option-item) {
  margin-bottom: 12px;
}

:deep(.option-name) {
  margin: unset;
  margin-left: 8px;
  margin-bottom: 10px;

  font-size: 16px;
  font-weight: bold;
}

:deep(.option-label) {
  margin: 0 6px;
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
      background-color: #f6006e;
    }
    &.cool {
      background-color: #036bfb;
    }
    &.passion {
      background-color: #fbb127;
    }

    background-color: #528bff;
  }
}

:deep(input[type="text"]) {
  width: 200px;
  height: 28px;
  margin-left: 8px;
  border: 1px grey solid;
  border-radius: 6px;
}

:deep(input[type="checkbox"]) {
  display: none;
}
</style>
