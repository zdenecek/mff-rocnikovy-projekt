import { UserServiceContract } from "@/service/UserServiceContract";
import HomeView from "@/views/HomeView.vue";
import MainView from "@/views/MainView.vue";
import UsersView from "@/views/UsersView.vue";
import { container } from "tsyringe";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/main",
        component: MainView,
        children: [
            {
                name: "home",
                path: "/",
                component: HomeView,
            },
            {
                name: "tournaments",
                path: "/turnaje",
                component: () => import("../views/TournamentsView.vue"),
            },
            {
                path: "/hraci",
                name: "players",
            component: () => import("../views/PlayersView.vue"),
            },
            {
                path: "/admin",
                name: "admin",
                component: () => import("../views/AdminView.vue"),
                children: [
                    {
                        path: "users",
                        name: "users",
                        component: UsersView,
                    },
                ],
            },
        ],
    },
    {
        path: "/prihlaseni",
        name: "login",
        meta: {
            title: "Login",
        },
        component: () => import("../views/LoginView.vue"),
    },
    {
        path: "/registrace",
        name: "register",
        component: () => import("../views/RegisterView.vue"),
    },
    {
        path: "/odhlaseni",
        name: "logout",
        redirect: () => {
            container
                .resolve<UserServiceContract>("UserServiceContract")
                .logout();
            return { name: "home", reload: true };
        },
    },
    {
        path: "/chyba",
        name: "error",
        props: true,
        component: () => import("../views/ErrorView.vue"),
    },
];

export default routes;
