import {reactive} from 'vue'
import axios from "axios";
import router from "@/router/router";
import {ResponseObject, User, Question} from "pre-shift-examiner-middleware";

export const store = reactive({
    user: {} as User,
    questions: [] as Question[],
    currentQuestionIndex: 0,

    async login() {
        const responseObject: ResponseObject = await axios.get(
            process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_LOGIN,
            {
                params: {
                    personnel_id: this.user.personnelId
                }
            });

        if (responseObject.user?.id) {
            this.user = responseObject.user;
            await router.push({path: "/testing"})
        }
    },

    async getQuestions() {
        const responseObject: ResponseObject = await axios.get(
            process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_GET_QUESTIONS,
            {
                params: {
                    setting_id: this.user.settingId
                }
            });

        this.questions = responseObject.questions!;
    },

    setDefaultStore() {
        this.user = {} as User;
        this.questions = [] as Question[];
        this.currentQuestionIndex = 0;
    }

});
