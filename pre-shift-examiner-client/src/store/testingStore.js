import { reactive } from 'vue';
export const testingStore = reactive({
    settings: {},
    setSettings(settings) {
        this.settings = settings;
    },
    questions: [],
    currentQuestionIndex: 0,
    setQuestions(questions) {
        this.questions = questions;
    },
    nextQuestion() {
        this.currentQuestionIndex++;
    },
    answers: {},
    setAnswer(questionId, optionId) {
        this.answers[questionId].push(optionId);
    },
    initAnswers() {
        const answers = {};
        this.questions.forEach(question => answers[question.id] = []);
        this.answers = answers;
    },
    results: [],
    setResults(results) {
        this.results = results;
    },
    setDefaultState() {
        this.settings = {};
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.results = [];
    },
});
//# sourceMappingURL=testingStore.js.map