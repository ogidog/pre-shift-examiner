import {reactive} from "vue";
import {INotifier} from "pre-shift-examiner-types";

export const uiStore = reactive({
    notifier: <INotifier>{},
    notify(visible: INotifier["visible"], message?: INotifier["message"], error?: INotifier["error"]) {
        this.notifier = {visible: visible, message: message, error: error};
    },

    virtualKeyBoardVisible: JSON.parse(localStorage.virtualKeyBoardVisible),
    setVirtualKeyBoardVisible() {
        this.virtualKeyBoardVisible = !this.virtualKeyBoardVisible;
        localStorage.virtualKeyBoardVisible = this.virtualKeyBoardVisible;
    },

    keyDownCode: {} as Number,
    setKeyDownCode(keyDownCode: Number) {
        this.keyDownCode = keyDownCode;
    },

    setDefaultState() {
        this.notifier = <INotifier>{}
    }
});


