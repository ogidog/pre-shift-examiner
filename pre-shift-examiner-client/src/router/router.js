import { createRouter, createWebHashHistory } from 'vue-router';
import { LoginForm } from "@/components/login-form/ui";
import { TestingForm } from "@/components/testing-form";
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
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;
//# sourceMappingURL=router.js.map