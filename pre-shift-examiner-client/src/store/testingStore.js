import { reactive } from 'vue';
export const testingStore = reactive({
    questions: [],
    currentQuestionIndex: 0,
    result: { userId: NaN, questionId: NaN, option_ids: [], date_time: NaN },
    async setDefaultState() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.result = {};
    }
});
//# sourceMappingURL=testingStore.js.map