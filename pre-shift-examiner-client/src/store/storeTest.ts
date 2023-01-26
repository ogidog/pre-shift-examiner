import {reactive} from 'vue'
import axios from "axios";
import {ResponseObject, Question} from "pre-shift-examiner-middleware";

export const storeTest = reactive({
    questions: [] as Question[],
    currentQuestionIndex: 0,

    async getQuestions(settingId: number) {
        const responseObject: ResponseObject = await axios.get(
            process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_GET_QUESTIONS,
            {
                params: {
                    setting_id: settingId
                }
            });

        this.questions = responseObject.questions!;
    },

    setDefaultStore() {
        this.questions = [] as Question[];
        this.currentQuestionIndex = 0;
    }

});
