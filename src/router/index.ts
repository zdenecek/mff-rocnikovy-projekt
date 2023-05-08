import { UserServiceContract } from "@/service/UserServiceContract";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersView from "../views/UsersView.vue";
import { container } from "@/container";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/auth/LoginView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../components/auth/RegisterView.vue"),
    },
    {
        path: "/logout",
        name: "logout",
        redirect: () => {
            container.resolve<UserServiceContract>("UserServiceContract").logout();
            return { name: "home", reload: true };
        },
    },
    {
        path: "/error",
        name: "error",
        props: true,
        component: () => import("../views/ErrorView.vue"),
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
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

function registerMiddleware(userService: UserServiceContract): void {
    router.beforeResolve(async (to,from) => {
        if (to.name === "login" || to.name === "register") {
            if (await userService.isLoggedIn()) {
                console.debug("User logged in, redirecting to home");
                return { name: "home" };
            } 
        } else if (to.name === "admin") {
            if (!(await userService.isLoggedIn()))
                return {
                    name: "login",
                };
            else if (!(await userService.user())?.isAdmin()) {

                console.debug("User is not admin, redirecting to error");
                return {
                    name: "error",
                    replace: true,
                    query: {
                        message: "You are not authorized to access this page",
                    },
                }
            }

        }
    });

}

export { router, registerMiddleware };
