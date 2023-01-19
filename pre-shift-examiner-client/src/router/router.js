import {createRouter, createWebHashHistory} from 'vue-router'
import LoginForm from "@/components/login/LoginForm";
import QuestionsForm from "@/components/testing/QuestionsForm";
//import {store} from "@/store/store";

const routes = [
    {path: "/", name: "LoginForm", component: LoginForm},
    {path: "/testing", name: "QuestionForm", component: QuestionsForm}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === "/testing") {
        console.log(to, from)
    }
    next()
})

export default router;
