import { reactive } from "vue"
import type { Option } from "@/types/option"

const options: Option = reactive({
  cardName: "",
  idolName: "",
  limited: { none: true, monthly: true, blanc: true, noir: true },
  type: { cute: true, cool: true, passion: true },
  showName: true,
  awaken: true,
})

export default options
