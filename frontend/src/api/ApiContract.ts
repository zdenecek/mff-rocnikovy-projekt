import { AxiosRequestConfig } from "axios";

export interface ApiContract {

    get(url: string, config?: AxiosRequestConfig<any>) : Promise<any>;
    post(url: string, data?: any, config?: AxiosRequestConfig<any>) : Promise<any>;
    put(url: string, data?: any, config?: AxiosRequestConfig<any>) : Promise<any>;
    delete(url: string, config?: AxiosRequestConfig<any>) : Promise<any>;
}