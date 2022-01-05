import { User } from "./user";

export interface Jwt {
    exp: number,
    user: User
}
