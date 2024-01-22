import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router";
import initializePlugins from "./plugins";

import "@/styles/index.scss";

const app = createApp(App);

initializePlugins(app);

app.use(router).mount("#app");
