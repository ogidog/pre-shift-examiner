import { createRouter, createWebHashHistory } from 'vue-router';
import LoginForm from "@/components/login/LoginForm.vue";
import QuestionsForm from "@/components/testing/QuestionsForm.vue";
const routes = [
    { path: "/", name: "LoginForm", component: LoginForm },
    { path: "/testing", name: "QuestionForm", component: QuestionsForm }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    if (to.path === "/testing") {
        console.log();
    }
    next();
});
export default router;
//# sourceMappingURL=router.js.map