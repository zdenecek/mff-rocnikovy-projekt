import CoolLayoutVue from "@/layouts/CoolLayout.vue";
import { RouteRecordRaw } from "vue-router";
import { h } from "vue";
import { RouterView } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: CoolLayoutVue,
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("@/views/HomeView.vue"),
        beforeEnter: (to, from, next) => {
          next({ name: "tournaments" });
        }
      },
      {
        name: "privacy-policy",
        path: "/podminky-ochrany-osobnich-udaju",
        meta: {
          pageName: 'privacy-policy'
        },
        component: () => import("@/views/PrivacyPolicyView.vue"),
      },
      {
        path: "/turnaje",
        component: { render: () => h(RouterView) },

        meta: {
          subnav: [
            { to: { name: "tournaments" }, text: "Republikové" },
            { to: { name: "tournaments" }, text: "HABRA" },
            { to: { name: "tournaments" }, text: "Klubové" },
            {
              to: {
                name: "redirect",
                params: {
                    href: "https://docs.google.com/spreadsheets/d/1xYc3QqQcsWlYdgIhdQLDLN2DBV59ewbwYwaWfvtXWfY/edit#gid=1977226379"
                }
                
              },
              text: "Přihlášky",
            },
          ],
        },
        children: [
          {
            path: "",
            name: "tournaments",
            component: () =>
              import("@/views/tournament/TournamentsView.vue"),
          },
          {
            path: ":id/:slug?",
            name: "tournament",
            component: () => import("@/views/tournament/TournamentView.vue"),
          },
        ],
      },
      {
        name: "players",
        path: "/hraci",
        component: () => import("@/views/player/PlayersView.vue"),
        meta: {
          subnav: [
            { to: { name: "players" }, text: "Hráči" },
            { to: { name: "players" }, text: "Páry" },
            { to: { name: "players" }, text: "Ranking" },
            { to: { name: "players" }, text: "Výkonnostní třídy" },
            { to: { name: "players" }, text: "Síň slávy" },
            { to: { name: "players" }, text: "Reprezentace" },
          ],
        },
      },

      {
        name: "series",
        path: "/serie",
        component: () => import("@/views/SeriesView.vue"),
      },

      {
        path: "/admin",
        component: { render: () => h(RouterView) },
        children: [
          {
            name: "admin",
            path: "",
            component: () => import("@/views/admin/AdminView.vue"),
          },
          {
            name: "admin-add-tournament",
            path: "/admin/pridat-turnaj",
            component: () =>
              import("@/views/admin/tournament/AddTournamentView.vue"),
          },
          {
            name: "admin-edit-tournament",
            path: "/admin/upravit-turnaj/:id",
            component: () =>
              import("@/views/admin/tournament/EditTournamentView.vue"),
          },
          {
            name: "admin-import-players",
            path: "/admin/importovat-hrace",
            component: () =>
              import("@/views/admin/player/ImportPlayersView.vue"),
          },
          {
            name: "admin-add-series",
            path: "/admin/pridat-serii",
            component: () => import("@/views/admin/series/AddSeriesView.vue"),
          },
          {
            name: "admin-user-list",
            path: "/admin/prehled-uzivatelu",
            component: () => import("@/views/admin/user/UserListView.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/FocusLayout.vue"),
    children: [
      {
        name: "login",
        path: "/prihlaseni",
        component: () => import("@/views/user/LoginView.vue"),
      },
      {
        name: "register",
        path: "/registrace",
        component: () => import("@/views/user/RegisterView.vue"),
      },
      // {
      //   name: "forgot-password",
      //   path: "/forgot-password",
      //   component: () => import("@/views/ForgotPasswordView.vue"),
      // },
      // {
      //   name: "reset-password",
      //   path: "/reset-password/:token",
      //   component: () => import("@/views/ResetPasswordView.vue"),
      // },
    ],
  },
  {
    name: "redirect",
    path: "/redirect/:href",
    component: () => {},
    beforeEnter: (to) => {
      window.location.href = to.params.href as string;
      return false;
    }
  },

];

export default routes;
