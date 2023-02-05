import axios from "axios";
import {ErrorMessages} from "pre-shift-examiner-types";

if(process.env.NODE_ENV === "production"){
    process.env["SERVER_API"] = "https://pre-shift-examiner-api.onrender.com";
}

// export const API_LOGIN = "/api/auth/login";
// export const API_GET_QUESTIONS = "/api/testing/questions";
// export const API_CHECK_ANSWERS =  "/api/testing/check-answers";

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env["SERVER_API"]
});

axiosInstance.interceptors.response.use(function (response) {
    return response.data;

}, function (error) {
    if(error.code === "ERR_NETWORK"){
        throw ({message: ErrorMessages.SERVER_ERROR});
    }
    return error.response.data;
});
