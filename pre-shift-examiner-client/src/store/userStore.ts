import {reactive} from 'vue';
import axios from "axios";
import router from "@/router/router";
import {IResponseObject, IUser} from "pre-shift-examiner-types/index";
import {testingStore} from "@/store/testingStore";

export const userStore = reactive({
    user: {} as IUser,

    async login() {
        const responseObject: IResponseObject = await axios.get("http://" +
            process.env.VUE_APP_WEB_SERVER_HOST +
            process.env.VUE_APP_API_LOGIN, {
            params: {
                personnel_id: this.user.personnelId
            }
        });
        if (responseObject.user?.id) {
            this.user = responseObject.user;
            await testingStore.startTesting();
        }
    },

    async logout() {
        this.setDefaultState();
        //TODO: make request
        await router.push({path: "/"});
    },

    setDefaultState() {
        this.user = {} as IUser;
    }
});
