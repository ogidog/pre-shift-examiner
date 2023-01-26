import {reactive} from 'vue';
import axios from "axios";
import router from "@/router/router";
import {ResponseObject, User} from "pre-shift-examiner-middleware";

export const authStore = reactive({
    user: {} as User,

    async login() {
        const responseObject: ResponseObject = await axios.get("http://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_LOGIN, {
            params: {
                personnel_id: this.user.personnelId
            }
        });
        if (responseObject.user?.id) {
            this.user = responseObject.user;
            await router.push({path: "/testing"});
        }
    },

    setDefaultStore() {
        this.user = {} as User;
    }
});
