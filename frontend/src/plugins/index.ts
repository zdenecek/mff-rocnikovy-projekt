import { App } from "vue";

import vuetify from "./vuetify";
import pinia from "./pinia";
import { router } from "@/router";

export default function initializePlugins(app: App) {
  app
  .use(router)
  .use(vuetify)
  .use(pinia);
}
