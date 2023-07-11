export interface IPaginateInfo {
    count: number
    currentPage: number
    lastPage: number
    page?: number
    onChange?: (event: React.ChangeEvent<unknown>, value: number) => void
}