export interface IUser {
    id: number,
    personnelId: string,
    surname: string,
    name: string,
    patronymic: string,
    settingId: number
}

export interface IResponseObject {
    httpStatusCode: number,
    questions?: IQuestion[],
    user?: IUser,
    settings?: ISettings,
    error?: IError,
    results?: any,
}

export interface ISettings {
    testDuration: number,
    resultDisplayType: 'short' | 'detail'
}

export interface IQuestion {
    id: number,
    text: string,
    options: IOption[],
    multiple: boolean
}

export interface IOption {
    id: number,
    content: string
}

export type IAnswers = { [key: IQuestion["id"]]: IOption["id"][] }

export interface INotifier {
    visible: boolean,
    message?: string,
    error?: IError,
}

export interface IError {
    message: string,
}

export const ErrorMessages = {
    PERSONNEL_ID_ERROR: "Неправильный табельный номер",
    SERVER_ERROR: "Ошибка сервера",
    SAVING_ANSWERS_ERROR: "Ошибка сохранения результатов",
}

export const NotifierMessages = {
    AUTHENTICATION: "Аутентификация...",
    TEST_LOADING: "Загрузка теста...",
    SAVING_ANSWERS: "Сохранение ответов...",
    CHECKING_ANSWERS: "Проверка ответов...",
}
