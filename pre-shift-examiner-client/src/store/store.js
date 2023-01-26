import { reactive } from 'vue';
import axios from "axios";
import router from "@/router/router";

export const store = reactive({
    user: {},
    questions: [],
    currentQuestionIndex: 0,
    async login() {
        const responseObject = await axios.get(process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_LOGIN, {
            params: {
                personnel_id: this.user.personnelId
            }
        });
        if (responseObject.user?.id) {
            this.user = responseObject.user;
            await router.push({ path: "/testing" });
        }
    },
    async getQuestions() {
        const responseObject = await axios.get(process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_GET_QUESTIONS, {
            params: {
                setting_id: this.user.settingId
            }
        });
        this.questions = responseObject.questions;
    },
    setDefaultStore() {
        this.user = {};
        this.questions = [];
        this.currentQuestionIndex = 0;
    }
});
//# sourceMappingURL=store.js.map
