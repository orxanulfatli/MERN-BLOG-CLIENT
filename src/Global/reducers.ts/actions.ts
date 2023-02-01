import axios, { AxiosError } from "axios";
import { IUser } from "./UserSlice";
import { createAsyncThunk } from '@reduxjs/toolkit';




export const getUsers = createAsyncThunk<IUser[], undefined, { rejectValue: string }>('getUsers', async (_,{rejectWithValue}) => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/user')
        return data
    } catch (err:any) {
        let error: AxiosError<string> = err // cast the error for access

        if (!error.response) {
            throw err
        }
        return rejectWithValue(error.message)
    }
})