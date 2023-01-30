import {reactive} from 'vue';
import {IUser} from "pre-shift-examiner-types/index";

export const userStore = reactive({
    user: {} as IUser,

    setUser(user: IUser) {
        this.user = user;
    },

    async setDefaultState() {
        this.user = {} as IUser;
    },
});
