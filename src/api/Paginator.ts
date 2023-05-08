
export interface APIPaginator<T> {
    total: number;
    current_page: number;
    per_page: number;
    from: number | null;
    to: number | null;
    last_page: number;
    data: T[];
}


export class Paginator<T>  {
    total: number;
    page: number;
    perPage: number;
    from: number | null;
    to: number | null;
    lastPage: number;
    data: T[];

    constructor(data: APIPaginator<T>) {
        this.total = data.total;
        this.page = data.current_page;
        this.perPage = data.per_page;
        this.from = data.from;
        this.to = data.to;
        this.lastPage = data.last_page;
        this.data = data.data as T[];
    }
}