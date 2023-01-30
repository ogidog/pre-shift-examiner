import axios from "axios";
import {testingStore} from "@/store";
import {IResponseObject, IUser, IAnswers} from "pre-shift-examiner-types";
import {API_GET_QUESTIONS, API_SAVE_ANSWERS} from "@/shared/config"

export const startTesting = async (settingId: IUser["settingId"]) => {
    const responseObject: IResponseObject = await axios.get(
        API_GET_QUESTIONS,
        {
            params: {
                "setting-id": settingId
            }
        });

    if (responseObject.questions) {
        testingStore.setQuestions(responseObject.questions)
    } else {
        throw responseObject.error;
    }
}

export const saveAnswers = async (userId: IUser["id"], answers: IAnswers) => {
    const responseObject: IResponseObject = await axios.post(
        API_SAVE_ANSWERS,
        {"user-id": userId, answers: answers}
    );
}

export const finishTesting = async () => {

}
