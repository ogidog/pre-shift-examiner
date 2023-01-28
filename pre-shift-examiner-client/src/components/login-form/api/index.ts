import axios from "axios";
import router from "@/router/router";
import {IResponseObject, IUser} from "pre-shift-examiner-types/index";
import {userStore} from "@/store";

export const login = async (): Promise<IUser | undefined> => {
    const responseObject: IResponseObject = await axios.get("http://" +
        process.env.VUE_APP_WEB_SERVER_HOST +
        process.env.VUE_APP_API_LOGIN, {
        params: {
            personnel_id: userStore.user.personnelId
        }
    });

    if (responseObject.user) {
        userStore.user = responseObject.user;
        return responseObject.user;

    } else {
        throw responseObject.error
    }
}

const logout = async () => {
    //TODO: make request
    await router.push({path: "/"});
}
