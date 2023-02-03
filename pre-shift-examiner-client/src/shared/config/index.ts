const BASE_SERVER_URL = () => {
    return "http://172.16.1.117"
}

export const API_LOGIN = BASE_SERVER_URL() + "/api/auth/login";
export const API_GET_QUESTIONS = BASE_SERVER_URL() + "/api/testing/questions";
export const API_CHECK_ANSWERS = BASE_SERVER_URL() + "/api/testing/check-answers"
