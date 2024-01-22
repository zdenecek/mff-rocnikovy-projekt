import { App } from "vue";
import vuetify from "./vuetify";
import pinia from "./pinia";

export default function initializePlugins(app: App) {
  app.use(vuetify).use(pinia);
}
