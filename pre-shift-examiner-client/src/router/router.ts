import {createRouter, createWebHashHistory} from 'vue-router'
import {LoginPage} from "@/pages/login-page/ui";
import {MainPage} from "@/pages/main-page/ui";
import {TestingForm} from "@/widgets/testing-form/ui";
import {ResultsFrom} from "@/widgets/results-form/ui";

const routes = [
    {
        path: "/",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/main",
        name: "MainPage",
        component: MainPage,
        children: [
            {
                path: "testing",
                name: "TestingForm",
                component: TestingForm
            },
            {
                path: "results",
                name: "ResultsForm",
                component: ResultsFrom
            },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    performance.getEntriesByType("navigation").forEach(entries => {
        if ((<PerformanceNavigationTiming>entries).type === "reload" && from.path === "/") {
            next(false);
            window.location.replace("/");
        } else {
            next()
        }
    });
})

export default router;
