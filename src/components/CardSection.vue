<script setup lang="ts">
import { reactive, ref, watch, computed, onMounted } from "vue"
import Data from "@/assets/data.json"
import opt from "@/store"
import type { Option } from "@/types/option"

const IMG = "https://hidamarirhodonite.kirara.ca/icon_card/"
const isLoaded = ref(false)
const checklist = reactive<Set<string>>(new Set())

// 이미 저장된 체크리스트가 있는지 확인
onMounted(() => {
  if (localStorage.getItem("checklist")) {
    const prevChecklist = JSON.parse(
      localStorage.getItem("checklist") as string
    ) as string[]
    prevChecklist.forEach((c) => checklist.add(c))
  }
  isLoaded.value = true
})
// checklist가 바뀔 때마다 localStorage도 업데이트
watch(checklist, (c) => {
  localStorage.setItem("checklist", JSON.stringify(Array.from(c)))
})

// 카드 선택 토글
const toggleChecked = (e: MouseEvent) => {
  const target = e.currentTarget as Element
  const id = target.id
  if (checklist.has(id)) {
    checklist.delete(id)
  } else {
    checklist.add(id)
  }
}

// 조건에 맞는 카드 필터
const filtered = computed(() => {
  const result: typeof Data = []

  Data.forEach((d) => {
    const type = d.type as keyof Option["type"]
    const limited = d.limited as keyof Option["limited"]
    // type, gacha type
    if (!opt.type[type] || !opt.limited[limited]) return
    // idol name
    if (opt.idolName !== "") {
      if (
        !(
          d.name_kr.includes(opt.idolName) ||
          d.name_en.includes(opt.idolName) ||
          d.name_jp.includes(opt.idolName)
        )
      )
        return
    }
    // card name
    if (opt.cardName !== "") {
      if (!d.card_name.toLowerCase().includes(opt.cardName)) return
    }

    result.push(d)
  })

  return result
})
</script>

<template>
  <main>
    <header>✅&nbsp;CGSS SSR Checker</header>
    <section
      class="card-container"
      :class="{ awaken: opt.awaken, 'hide-name': !opt.showName }"
    >
      <template v-for="d in filtered" :key="d.id">
        <article :id="d.id" class="card" @click="toggleChecked">
          <img class="normal" :src="`${IMG}${d.id}.png`" />
          <img class="awaken" :src="`${IMG}${Number(d.id) + 1}.png`" />
          <div class="card-name">[{{ d.card_name }}] {{ d.name }}</div>
        </article>
      </template>
    </section>
  </main>
</template>

<style lang="scss">
main {
  width: 100%;
  height: calc(100vh - 48px);
  padding-bottom: 12px;
  overflow: hidden scroll;
}

header {
  height: 36px;
  margin: 12px 0;
  padding: 0 8px;

  display: flex;
  align-items: center;

  font-size: 20px;
  font-weight: 700;
}

.card-container {
  margin: 0 8px;

  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));

  &.hide-name > article > .card-name {
    display: none;
  }

  img {
    width: 56px;
    height: 56px;
  }
  .normal {
    display: block;
  }
  .awaken {
    display: none;
  }
  &.awaken {
    .normal {
      display: none;
    }
    .awaken {
      display: block;
    }
  }
}

.card {
  max-width: 100%;
  border: 1px solid #ccc;
  padding: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 12px;
  font-weight: 300;

  cursor: pointer;
  user-select: none;

  transition: background-color 0.3s;

  @media (max-width: 640px) {
    font-size: 0.7rem;
  }

  &.checked {
    background-color: #c6e5f6;
  }
}

.card-name {
  margin-top: 4px;
}
</style>
