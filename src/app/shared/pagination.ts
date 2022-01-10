export interface Pagination<T> {
    page: number
    size: number
    count: number
    data: T[]
} 