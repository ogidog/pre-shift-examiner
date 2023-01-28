import axios from "axios";
import {testingStore, userStore} from "@/store"
import {IResponseObject, IUser} from "pre-shift-examiner-types"

const getQuestions = async (settingId: number) => {
    const responseObject: IResponseObject = await axios.get(
        process.env.VUE_APP_WEB_SERVER_PROTOCOL + "://" +
        process.env.VUE_APP_WEB_SERVER_HOST +
        process.env.VUE_APP_API_GET_QUESTIONS,
        {
            params: {
                setting_id: settingId
            }
        });

    if (responseObject.questions) {
        testingStore.questions = responseObject.questions;
        return responseObject.questions;

    } else {
        throw responseObject.error
    }
}

export const sendResult = async () => {

}

export const startTesting = async (settingId: IUser["settingId"]) => {
    await getQuestions(settingId);
}

export const finishTesting = async () => {
    await testingStore.setDefaultState();
}
