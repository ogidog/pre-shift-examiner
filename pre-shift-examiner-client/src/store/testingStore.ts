import {reactive} from 'vue'
import {IQuestion, IAnswers, IOption, IResult, ISettings} from "pre-shift-examiner-types/index";

export const testingStore = reactive({
    questions: <IQuestion[]>[],
    currentQuestionIndex: 0,
    answers: <IAnswers>{},
    results: <IResult[]>[],
    settings: <ISettings>{},

    setSettings(settings: ISettings) {
        this.settings = settings;
    },

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

    setResults(results: IResult[]) {
        this.results = results;
    },

    setDefaultState() {
        this.settings = <ISettings>{};
        this.questions = <IQuestion[]>[];
        this.currentQuestionIndex = 0;
        this.answers = <IAnswers>{};
        this.results = <IResult[]>[];
    },

});
