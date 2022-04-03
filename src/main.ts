import { createApp } from "vue"
import App from "./App.vue"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { IoChevronUpSharp } from "oh-vue-icons/icons"

// add icons for oh-vue-icons
addIcons(IoChevronUpSharp)

createApp(App).component("v-icon", OhVueIcon).mount("#app")
