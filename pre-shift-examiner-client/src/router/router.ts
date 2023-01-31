import {createRouter, createWebHashHistory} from 'vue-router'
import {LoginForm} from "@/components/login-form/ui";
import {TestingForm} from "@/components/testing-form/ui";
import {ResultsFrom} from "@/components/results-form/ui";

const routes = [
    {
        path: "/",
        name: "Login",
        component: LoginForm
    },
    {
        path: "/testing",
        name: "Testing",
        component: TestingForm
    },
    {
        path:"/results",
        name: "Results",
        component: ResultsFrom
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
