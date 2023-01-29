import { reactive } from 'vue';
export const testingStore = reactive({
    questions: [],
    currentQuestionIndex: 0,
    results: {},
    async setDefaultState() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.results = {};
    }
});
//# sourceMappingURL=testingStore.js.map