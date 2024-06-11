import initializePlugins from "./plugins";
import App from "./App.vue";
import { createApp } from "vue";

import "@/styles/index.scss";

const app = createApp(App);

initializePlugins(app);

app.mount("#app");
