import axios from "axios";
import router from "@/router/router";
import {IResponseObject} from "pre-shift-examiner-types/index";
import {userStore} from "@/store";
import {API_LOGIN} from "@/shared/config";

export const login = async () => {
    const responseObject: IResponseObject = await axios.get(API_LOGIN, {
        params: {
            "personnel-id": userStore.user.personnelId
        }
    });

    if (responseObject.user) {
        userStore.setUser(responseObject.user);
    } else {
        throw responseObject.error;
    }
}

const logout = async () => {
    //TODO: make request
    //await router.push({path: "/"});
    //await userStore.setDefaultState();
}
