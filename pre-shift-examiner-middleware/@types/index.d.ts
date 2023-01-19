interface User {
    id: number,
    personnel_id: number,
    surname: string,
    name: string,
    patronymic: string,
}

interface ResponseObject {
    httpStatusCode: number,
    questions?: Question[] | null,
    user?: User | null,
    settings?: Settings | null
}

interface Settings {
    testDuration: number,
    resultDisplayType: 'short' | 'detail'
}

interface Question {
    id: number,
    content: string,
    options: { id: number, content: string }[],
}
