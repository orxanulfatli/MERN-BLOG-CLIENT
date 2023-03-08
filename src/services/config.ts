import axios from "axios";

export const $mainAPi = axios.create({
    baseURL: 'http://localhost:5000/api'
}
)