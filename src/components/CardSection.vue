<script setup lang="ts">
import { reactive, watch, computed, onMounted } from "vue"
import Data from "@/assets/data.json"
import opt from "@/store"
import type { Option } from "@/types/option"

const IMG = "https://hidamarirhodonite.kirara.ca/icon_card/"
const checklist = reactive<Set<string>>(new Set())

// 이미 저장된 체크리스트가 있는지 확인
onMounted(() => {
  if (localStorage.getItem("checklist")) {
    const prevChecklist = JSON.parse(
      localStorage.getItem("checklist") as string
    ) as string[]
    prevChecklist.forEach((c) => checklist.add(c))
  }
})
// checklist가 바뀔 때마다 localStorage도 업데이트
watch(checklist, (c) => {
  localStorage.setItem("checklist", JSON.stringify(Array.from(c)))
})

// 카드 선택 토글
const toggleChecked = (e: MouseEvent) => {
  const target = e.currentTarget as Element

  // update checklist
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
    <section
      class="card-container"
      :class="{ awaken: opt.awaken, 'hide-name': !opt.showName }"
    >
      <article
        v-for="d in filtered"
        :key="d.id"
        :id="d.id"
        class="card"
        :class="{ checked: checklist.has(d.id) }"
        @click="toggleChecked"
      >
        <img class="normal" :src="`${IMG}${d.id}.png`" />
        <img class="awaken" :src="`${IMG}${Number(d.id) + 1}.png`" />
        <div class="card-name">[{{ d.card_name }}] {{ d.name }}</div>
      </article>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  padding-bottom: 12px;
  overflow: hidden scroll;
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
