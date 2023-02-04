import {IResponseObject, IUser, IAnswers} from "pre-shift-examiner-types";
import {axiosInstance, API_GET_QUESTIONS, API_CHECK_ANSWERS} from "@/shared/config"

export const startTesting = async (settingId: IUser["settingId"]) => {
    const responseObject: IResponseObject = await axiosInstance.get(
        API_GET_QUESTIONS,
        {
            params: {
                "setting-id": settingId
            }
        });

    if (!responseObject.error) {
        return responseObject;
    }

    throw responseObject.error;

}

export const checkAnswers = async (userId: IUser["id"], answers: IAnswers) => {
    const responseObject: IResponseObject = await axiosInstance.post(
        API_CHECK_ANSWERS,
        {"user-id": userId, answers: answers}
    );

    if (responseObject.results) {
        return responseObject.results;
    } else {
        throw responseObject.error;
    }
}
