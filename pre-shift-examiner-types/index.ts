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

export interface IResult {
    userId: IUser["id"],
    questionId: IQuestion["id"],
    option_ids: IOption["id"][],
    date_time: number,
}

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
}

export const NotifierMessages = {
    AUTHENTICATION: "Аутентификация...",
    TEST_LOADING: "Загрузка теста..."
}
