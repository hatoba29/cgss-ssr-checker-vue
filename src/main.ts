import { createApp } from "vue"
import App from "./App.vue"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { IoFilterSharp } from "oh-vue-icons/icons"

// add icons for oh-vue-icons
addIcons(IoFilterSharp)

createApp(App).component("v-icon", OhVueIcon).mount("#app")
