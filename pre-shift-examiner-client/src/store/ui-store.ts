import {reactive} from "vue";
import {INotifier} from "pre-shift-examiner-types";

export const uiStore = reactive({
    notifier: {} as INotifier,
});
