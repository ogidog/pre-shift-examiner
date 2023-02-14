import axios from "axios";
import {ErrorMessages} from "pre-shift-examiner-types";

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_SERVER_API,
});

axiosInstance.interceptors.response.use(function (response) {
    console.log(response)
    return response.data;

}, function (error) {
    if (error.code === "ERR_NETWORK") {
        throw ({message: ErrorMessages.SERVER_ERROR});
    }
    return error.response.data;
});
