import CoolLayoutVue from "@/layouts/CoolLayout.vue";
import { RouteRecordRaw } from "vue-router";
import { h } from "vue";
import { RouterView } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/main",
    component: CoolLayoutVue,
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        name: "tournaments",
        path: "/turnaje",
        component: () => import("@/views/TournamentView.vue"),
        meta: {
          subnav: [
            { name: "tournaments", text: "Republikové" },
            { name: "tournaments", text: "HABRA" },
            { name: "tournaments", text: "Klubové" },
            { name: "tournaments", text: "Přihlášky" },
          ],
        },
      },
      {
        name: "players",
        path: "/hraci",
        component: () => import("@/views/PlayersView.vue"),
        meta: {
          subnav: [
            { name: "players", text: "Hráči" },
            { name: "players", text: "Páry" },
            { name: "players", text: "Ranking" },
            { name: "players", text: "Výkonnostní třídy" },
            { name: "players", text: "Síň slávy" },
            { name: "players", text: "Reprezentace" },
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
            path: "/admin/addTournament",
            component: () =>
              import("@/views/admin/tournament/AddTournamentView.vue"),
          },
          {
            name: "admin-tournament-list",
            path: "/admin/tournamentList",
            component: () =>
              import("@/views/admin/tournament/TournamentListView.vue"),
          },
          {
            name: "admin-player-list",
            path: "/admin/playerList",
            component: () => import("@/views/admin/player/PlayerListView.vue"),
          },
          {
            name: "admin-add-player",
            path: "/admin/addPlayer",
            component: () => import("@/views/admin/player/AddPlayerView.vue"),
          },
          {
            name: "admin-import-players",
            path: "/admin/importPlayers",
            component: () =>
              import("@/views/admin/player/ImportPlayersView.vue"),
          },
          {
            name: "admin-series-list",
            path: "/admin/seriesList",
            component: () => import("@/views/admin/series/SeriesListView.vue"),
          },
          {
            name: "admin-add-series",
            path: "/admin/addSeries",
            component: () => import("@/views/admin/series/AddSeriesView.vue"),
          },
          {
            name: "admin-user-list",
            path: "/admin/userList",
            component: () => import("@/views/admin/user/UserListView.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
