import { Paginator } from "@/api/Paginator";


export interface RepositoryContract<T> {


    get(id: number): Promise<T>;
    getMany(perPage?: number, page?: number): Promise<Paginator<T>>;
    update(data: T): Promise<void>;
    delete(id: number): Promise<void>;
    
}