import {reactive} from 'vue'
import {IQuestion, IAnswer} from "pre-shift-examiner-types/index";

export const testingStore = reactive({
    questions: [] as IQuestion[],
    currentQuestionIndex: 0,
    results: {} as { [key: number]: IAnswer },

    async setDefaultState() {
        this.questions = [] as IQuestion[];
        this.currentQuestionIndex = 0;
        this.results = {};
    }
});
