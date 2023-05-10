import { UserServiceContract } from "@/service/UserServiceContract";
import { createRouter, createWebHashHistory } from "vue-router";
import { nextTick } from "vue";
import  routes from "./routes";


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

function registerMiddleware(userService: UserServiceContract): void {
    router.beforeResolve(async (to,) => {
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

    // todo move to dotenv
    const DEFAULT_TITLE = 'Bridge results';
    router.afterEach((to, ) => {
        nextTick(() => {
            if (to.meta.title)
            document.title = to.meta.title + ' | ' + DEFAULT_TITLE;
            else
            document.title = DEFAULT_TITLE;
        });
    });
}



export { router, registerMiddleware };
