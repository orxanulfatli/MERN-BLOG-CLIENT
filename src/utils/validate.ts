import { ILoginCredentials, IRegisterCredentials, IUserProfile } from "../models/User";

const validateEmail = (email: string) => {
    let emailRxp = /\S+@\S+\.\S+/
    return emailRxp.test(email)
}

const validateNumber = (number: string) => {
    let phoneRxp = /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return phoneRxp.test(number)

}

export const validateLogin = (values: ILoginCredentials) => {
    let errors = {} as any; 

    if (!values.account) {
        errors.account = 'Email address is required';
    } else if (!validateEmail(values.account) || validateNumber(values.account)) {
        errors.account = 'Email address or phone number  is invalid';
    }

    if (!values.password) errors.password = 'Password  is required'

    return errors
}

export const validateRegister = (values:IRegisterCredentials) => {
    let errors = {} as any;
  
    if (!values.name) {
        errors.name = 'Name is required'
    } else if (values.name.length>20) {
        errors.name = 'Name must be maximum 20 characters'
    }
    if (!values.account) {
        errors.account = 'Email address or number is required';
    } else if (!validateEmail(values.account) || validateNumber(values.account)) {
        errors.account = 'Email address or phone number  is invalid';
    }

    if (!values.password) {
        errors.password = 'Password  is required'
    } else if(values.password.length<6) {
        errors.password = ' Password must be at least 6 characters'
    }
    
    if (values.cfPassword !== values.password) {
        errors.cfPassword = 'Password not mathced'
    }
    return errors
}

export const validateImage = (image: File) => {
    if (image.size > 1024 * 1024)  return false 
    return true
}

export const validateUpdateUser = (values: IUserProfile) => {
    let errors = {} as any
    if (!values.avatar) {
       return errors
    }
    if (!validateImage(values.avatar  )) {
        errors.avatar = 'The largest image size is 1mb'
        console.log('error')
    }
    
    return errors
}