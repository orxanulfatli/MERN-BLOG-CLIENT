import { LoginFormInitData } from "../models/LoginTypes";

export const validateLogin = (values:LoginFormInitData ) => {
    let errors = {} as any;
    let phoneRxp = /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    let emailRxp = /\S+@\S+\.\S+/

    if (!values.account) {
        errors.account = 'Email address is required';
    } else if (!emailRxp.test(values.account) || phoneRxp.test(values.account)) {
        errors.account = 'Email address or phone number  is invalid';
    }

    if (!values.password) errors.password = 'Password  is required'

    return errors
}