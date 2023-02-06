import {reactive} from "vue";
import {INotifier} from "pre-shift-examiner-types";

export const uiStore = reactive({
    notifier: <INotifier>{},
    notify(visible: INotifier["visible"], message?: INotifier["message"], error?: INotifier["error"]) {
        this.notifier = {visible: visible, message: message, error: error};
    },

    virtualKeyBoardVisible: localStorage.virtualKeyBoardVisible,
    setVirtualKeyBoardVisible() {
        this.virtualKeyBoardVisible = !this.virtualKeyBoardVisible;
        localStorage.virtualKeyBoardVisible = this.virtualKeyBoardVisible;
    },

    setDefaultState() {
        this.notifier = <INotifier>{}
    }
});
