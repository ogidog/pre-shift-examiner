import { reactive } from 'vue';
import axios from "axios";
export const storeTest = reactive({
    questions: [],
    currentQuestionIndex: 0,
    async getQuestions(settingId) {
        const responseObject = await axios.get(process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_GET_QUESTIONS, {
            params: {
                setting_id: settingId
            }
        });
        this.questions = responseObject.questions;
    },
    setDefaultStore() {
        this.questions = [];
        this.currentQuestionIndex = 0;
    }
});
//# sourceMappingURL=storeTest.js.map