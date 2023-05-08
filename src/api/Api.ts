import axios, { AxiosRequestConfig } from "axios";
import { ApiContract } from "./ApiContract";

export class Api implements ApiContract {
    private doWithCsrf<T>(fn: () => Promise<T>): Promise<T> {
        return fn().catch((error) => {
            if (error?.response.status == 419) {
                console.log("CSRF error, retrying");
                return axios.get("csrf-cookie").then(() => {
                    return fn();
                });
            }
            throw error;
        });
    }

    private doAndParseReturn(fn: () => Promise<any>): Promise<any> {
        return fn()
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) throw error.response;
                throw error;
            });
    }

    get(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
        let task = axios.get.bind(axios, url, config);
        task = this.doWithCsrf.bind(this, task);
        return this.doAndParseReturn(task);
    }
    post(
        url: string,
        data?: Record<string, string>,
        config?: AxiosRequestConfig<any>
    ): Promise<any> {
        let task = axios.post.bind(axios, url, data, config);
        task = this.doWithCsrf.bind(this, task);
        return this.doAndParseReturn(task);
    }
    put(
        url: string,
        data?: Record<string, string>,
        config?: AxiosRequestConfig<any>
    ): Promise<any> {
        let task = axios.put.bind(axios, url, data, config);
        task = this.doWithCsrf.bind(this, task);
        return this.doAndParseReturn(task);
    }
    delete(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
        let task = axios.delete.bind(axios, url, config);
        task = this.doWithCsrf.bind(this, task);
        return this.doAndParseReturn(task);
    }
}
