import { reactive } from 'vue';
import axios from "axios";
import router from "@/router/router";
const initStore = {
    user: {
        id: NaN,
        personnelId: "НИ00-0011",
        surname: "",
        name: "",
        patronymic: "",
        settingId: NaN
    },
    questions: [{
            id: NaN,
            content: "",
            options: [{ id: NaN, content: "" }]
        }],
};
export const store = reactive({
    ...initStore,
    async login() {
        const responseObject = await axios.get(process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_LOGIN, {
            params: {
                personnel_id: this.user.personnelId
            }
        });
        if (responseObject.user?.id) {
            this.user = responseObject.user;
            await router.push({ path: "/testing" });
        }
    },
    async getQuestions() {
        const responseObject = await axios.get(process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_GET_QUESTIONS, {
            params: {
                setting_id: this.user.settingId
            }
        });
        this.questions = responseObject.questions;
        console.log(this.questions);
    }
});
//# sourceMappingURL=store.js.map