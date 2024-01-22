

export interface ApiError {
    response: {
        success: boolean
        code: string
        message: string
    }
}
