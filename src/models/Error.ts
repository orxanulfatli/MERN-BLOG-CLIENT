import { SerializedError } from "@reduxjs/toolkit"

export interface IApiError extends SerializedError  {
    success?:boolean
    errors?: Array<string>
}

