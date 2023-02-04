import {reactive} from 'vue';
import {IUser} from "pre-shift-examiner-types/index";

export const userStore = reactive({
    user: <IUser>{},

    setUser(user: IUser) {
        this.user = user;
    },

    setPersonnelId(personnelId: IUser["personnelId"]) {
        this.user.personnelId = personnelId;
    },

    async setDefaultState() {
        this.user = <IUser>{};
    },
});
