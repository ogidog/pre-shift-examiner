import axios from "axios";

export function useAxiosIntersect() {
    axios.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {
        return error.response.data;
    });
}
