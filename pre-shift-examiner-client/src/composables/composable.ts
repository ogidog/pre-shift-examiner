import axios from "axios";

export function useAxiosIntersect() {
    axios.interceptors.response.use(function (response) {
        return response.data;
        // if (response.data.notification) {
        //     const {type, message, description} = response.data.notification;
        //     rootStore.notificationStore.notify(type, message, description);
        // }
        // return response;

    }, function (error) {
        // if (error.response.data.notification) {
        //     const {type, message, description} = error.response.data.notification;
        //     rootStore.notificationStore.notify(type, message, description);
        // }
        // return error.response;

        return error.response.data;
    });
}
