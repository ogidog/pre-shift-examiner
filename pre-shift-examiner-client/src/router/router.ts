import {createRouter, createWebHashHistory} from 'vue-router'
import {LoginForm} from "@/components/login-form";
import {TestingForm} from "@/components/testing-form";
import {testingStore, userStore} from "@/store";

const routes = [
    {
        path: "/",
        name: "LoginForm",
        component: LoginForm
    },
    {
        path: "/testing",
        name: "TestingForm",
        component: TestingForm
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
