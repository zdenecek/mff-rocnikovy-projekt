/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1565C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
  defaults: {
    VDataTable: {
      itemsPerPageText: "Záznamů na stránku",
      noDataText: "Žádná data k zobrazení",
      pageText: "{0}-{1} z {2}",
      loadingText: "Načítání...",
      density: "comfortable",
      itemsPerPageOptions: [
        { value: 10, title: "10" },
        { value: 20, title: "20" },
        { value: 40, title: "40" },
        { value: -1, title: "Vše" },
      ],
    },
    VCard: {
      elevation: 0,
    },
    VTextField: {
      variant: "outlined",
      border: "solid 1px #163558",
      density: "comfortable",
    },
  },
});
