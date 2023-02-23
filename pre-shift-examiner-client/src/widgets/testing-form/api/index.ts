import {IResponseObject, IAnswers} from "pre-shift-examiner-types";
import {axiosInstance} from "@/shared/config";

export const startTesting = async () => {
    const responseObject: IResponseObject = await axiosInstance.get(
        process.env.VUE_APP_API_GET_QUESTIONS!,);
    console.log(responseObject)
    if (!responseObject.error) {
        return responseObject;
    }

    throw responseObject.error;

}

export const checkAnswers = async (answers: IAnswers) => {
    const responseObject: IResponseObject = await axiosInstance.post(
        process.env.VUE_APP_API_CHECK_ANSWERS!,
        {answers: answers}
    );

    if (responseObject.results) {
        return responseObject.results;
    } else {
        throw responseObject.error;
    }
}
