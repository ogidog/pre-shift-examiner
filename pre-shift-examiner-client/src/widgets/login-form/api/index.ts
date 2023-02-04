import {IResponseObject} from "pre-shift-examiner-types/index";
import {userStore} from "@/store";
import {axiosInstance, API_LOGIN} from "@/shared/config";

export const login = async () => {
    const responseObject: IResponseObject = await axiosInstance.get(API_LOGIN, {
        params: {
            "personnel-id": userStore.user.personnelId
        }
    });

    if (responseObject.user) {
        return responseObject.user;
    } else {
        throw responseObject.error;
    }
}

const logout = async () => {
    //TODO: make request
    //await router.push({path: "/"});
    //await userStore.setDefaultState();
}
