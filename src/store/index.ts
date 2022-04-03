import { reactive } from "vue"
import type { Option } from "@/types/option"

// State
const options: Option = reactive({
  cardName: "",
  idolName: "",
  limited: { none: true, monthly: true, blanc: true, noir: true },
  type: { cute: true, cool: true, passion: true },
  showName: true,
  awaken: true,
})

// Action
export const setType = (key: keyof Option["type"], value: boolean) => {
  options.type[key] = value
}
export const setLimited = (key: keyof Option["limited"], value: boolean) => {
  options.limited[key] = value
}
export const setName = (key: "cardName" | "idolName", value: string) => {
  options[key] = value
}
export const setBool = (key: "showName" | "awaken", value: boolean) => {
  options[key] = value
}

export default options
