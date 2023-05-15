
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

    static default<X>(): Paginator<X> {
        return new Paginator<X>({
            total: 0,
            current_page: 1,
            per_page: 15,
            from: null,
            to: null,
            last_page: 1,
            data: [],
        });
    }

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