import {reactive} from 'vue'
import {IQuestion, IAnswers, IOption, IResult, ISettings} from "pre-shift-examiner-types/index";

export const testingStore = reactive({
    settings: <ISettings>{},
    setSettings(settings: ISettings) {
        this.settings = settings;
    },

    questions: <IQuestion[]>[],
    currentQuestionIndex: 0,
    setQuestions(questions: IQuestion[]) {
        this.questions = questions;
    },
    nextQuestion() {
        this.currentQuestionIndex++;
    },

    answers: <IAnswers>{},
    setAnswer(questionId: IQuestion["id"], optionId: IOption["id"]) {
        this.answers[questionId].push(optionId);
    },
    initAnswers() {
        const answers: IAnswers = {};
        this.questions.forEach(question => answers[question.id] = []);
        this.answers = answers;
    },

    results: <IResult[]>[],
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
