import {reactive} from 'vue'
import axios from "axios";
import {IResponseObject, IQuestion, IResult} from "pre-shift-examiner-types/index";
import router from "@/router/router";
import {userStore} from "@/store/userStore";

export const testingStore = reactive({
    questions: [] as IQuestion[],
    currentQuestionIndex: 0,
    result: {} as IResult,

    async getQuestions(settingId: number) {
        const responseObject: IResponseObject = await axios.get(
            process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_GET_QUESTIONS,
            {
                params: {
                    setting_id: settingId
                }
            });

        return responseObject.questions!;
    },

    async sendResult() {
        const r: IResult = {userId: 1, questionId: 1, option_ids: [1, 2, 3], date_time: Date.now()}
    },

    async startTesting() {
        this.questions = await this.getQuestions(userStore.user.settingId);
        await router.push({path: "/testing"});
    },

    async finishTesting() {
        await userStore.logout();
        await this.setDefaultState();
    },

    setDefaultState() {
        this.questions = [] as IQuestion[];
        this.currentQuestionIndex = 0;
        this.result = {} as IResult;
    }

});
