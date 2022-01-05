import { User } from "src/app/user/models/user";

export interface Question {
    id: number
    statement: string
    answer: string
    user: User
}
