import { reactive } from 'vue';
export const testingStore = reactive({
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    results: [],
    setQuestions(questions) {
        this.questions = questions;
    },
    initAnswers() {
        const answers = {};
        this.questions.forEach(question => answers[question.id] = []);
        this.answers = answers;
    },
    setAnswer(questionId, optionId) {
        this.answers[questionId].push(optionId);
    },
    setResults(results) {
        this.results = results;
    },
    setDefaultState() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
    },
});
//# sourceMappingURL=testingStore.js.map