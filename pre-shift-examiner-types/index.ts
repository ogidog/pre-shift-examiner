export interface IAnswers {
    [key: IQuestion["id"]]: IOption["id"][]
}

export interface IAccessTokenPayload extends IUser, ISettings{
    loginAttempts?: number,
    isGotQuestions?: boolean,
    iat?: number,
    exp?: number,
}

export interface IUser {
    id?: number,
    personnelId?: string,
    surname: string,
    name: string,
    patronymic: string,
    settingId?: number,
}

export interface IResponseObject {
    httpStatusCode: number,
    questions?: IQuestion[],
    user?: IUser,
    settings?: ISettings,
    error?: IError,
    results?: IResult[],
    accessToken?: any
}

export interface ISettings {
    numberOfQuestionsPerTest?: number,
    categoryIdsPerTest?: number[],
    testDuration?: number,
    resultDisplayType?: 'short' | 'detail',
    isSaveAnswers?: boolean,
    testingTimeout?: number,
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
