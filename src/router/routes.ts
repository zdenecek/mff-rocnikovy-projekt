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
        path: "/login",
        name: "login",
        meta: {
            title: "Login",
        },
        component: () => import("../views/LoginView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/RegisterView.vue"),
    },
    {
        path: "/logout",
        name: "logout",
        redirect: () => {
            container
                .resolve<UserServiceContract>("UserServiceContract")
                .logout();
            return { name: "home", reload: true };
        },
    },
    {
        path: "/error",
        name: "error",
        props: true,
        component: () => import("../views/ErrorView.vue"),
    },
];

export default routes;
