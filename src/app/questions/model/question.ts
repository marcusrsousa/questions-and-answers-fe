import { User } from "src/app/user/models/user";
import { Answer } from "./answer";

export interface Question {
    id: number
    statement: string
    answers: Answer[]
    user: User
}
