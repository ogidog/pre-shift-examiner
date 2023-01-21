export interface User {
    id: number,
    personnelId: string,
    surname: string,
    name: string,
    patronymic: string,
    settingId: number
}

export interface ResponseObject {
    httpStatusCode: number,
    questions?: Question[],
    user?: User,
    settings?: Settings
}

export interface Settings {
    testDuration: number,
    resultDisplayType: 'short' | 'detail'
}

export interface Question {
    id: number,
    content: string,
    options: Option[],
}

export interface Option {
    id: number,
    content: string
}
