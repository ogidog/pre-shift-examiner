import {reactive} from 'vue'
import {IQuestion, IResult} from "pre-shift-examiner-types/index";


export const testingStore = reactive({
    questions: [] as IQuestion[],
    currentQuestionIndex: 0,
    result: {userId: NaN, questionId: NaN, option_ids: [], date_time: NaN} as IResult,

    async setDefaultState() {
        this.questions = [] as IQuestion[];
        this.currentQuestionIndex = 0;
        this.result = {} as IResult;
    }
});
