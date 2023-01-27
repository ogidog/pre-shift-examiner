import { reactive } from 'vue';
import axios from "axios";
import router from "@/router/router";
import { userStore } from "@/store/userStore";
export const testingStore = reactive({
    questions: [],
    currentQuestionIndex: 0,
    result: {},
    async getQuestions(settingId) {
        const responseObject = await axios.get(process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_GET_QUESTIONS, {
            params: {
                setting_id: settingId
            }
        });
        return responseObject.questions;
    },
    async sendResult() {
        const r = { userId: 1, questionId: 1, option_ids: [1, 2, 3], date_time: Date.now() };
    },
    async startTesting() {
        this.questions = await this.getQuestions(userStore.user.settingId);
        await router.push({ path: "/testing" });
    },
    async finishTesting() {
        await userStore.logout();
        await this.setDefaultState();
    },
    setDefaultState() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.result = {};
    }
});
//# sourceMappingURL=testingStore.js.map