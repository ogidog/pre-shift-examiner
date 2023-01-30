import {computed, reactive} from 'vue'
import {IQuestion, IAnswers, IOption} from "pre-shift-examiner-types/index";

export const testingStore = reactive({
    questions: [] as IQuestion[],
    currentQuestionIndex: 0,
    answers: {} as IAnswers,

    setQuestions(questions: IQuestion[]) {
        this.questions = questions;
    },

    initAnswers() {
        const answers: IAnswers = {};
        this.questions.forEach(question => answers[question.id] = []);
        this.answers = answers;
    },

    setAnswer(questionId: IQuestion["id"], optionId: IOption["id"]) {
        this.answers[questionId].push(optionId);
    },

    setDefaultState() {
        this.questions = [] as IQuestion[];
        this.currentQuestionIndex = 0;
        this.answers = {};
    },

});
