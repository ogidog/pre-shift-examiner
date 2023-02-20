export interface IAnswers {
    [key: IQuestion["id"]]: IOption["id"][]
}

export interface IAccessTokenPayload {
    loginAttempts: number,
    //nextSessionTime: number,
}

export interface IUser {
    id: number,
    personnelId: string,
    surname: string,
    name: string,
    patronymic: string,
    settingId: number,
}

export interface IResponseObject {
    httpStatusCode: number,
    questions?: IQuestion[],
    user?: IUser,
    settings?: ISettings,
    error?: IError,
    results?: IResult[],
}

export interface ISettings {
    testDuration: number,
    resultDisplayType: 'short' | 'detail',
    categoryIdsPerTest?: number[],
    numberOfQuestionsPerTest?: number,
    isSaveAnswers?: boolean,
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
    questionId: IQuestion["id"],
    optionIds: IOption["id"][],
    isCorrect: boolean,
    correctOptionsIds: IOption["id"][],
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
    AUTH_ERROR: "Ошибка аутентификации",
    TESTING_TIMEOUT_ERROR: "Повторное тестирование через",
    ATTEMPTS_EXCEEDED_ERROR: "Превышено максимальное число попыток",
}

export const NotifierMessages = {
    AUTHENTICATION: "Аутентификация...",
    TEST_LOADING: "Загрузка теста...",
    CHECKING_ANSWERS: "Проверка ответов...",
}
