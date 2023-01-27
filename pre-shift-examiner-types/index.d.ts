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
    settings?: ISettings
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
    userId: typeof IUser.id,
    questionId: typeof IQuestion.id,
    option_ids: typeof IOption.id[],
    date_time: number,
}
