import {  IBlog } from "../models/Blog";
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
    if (image?.size > 1024 * 1024)  return false 
    return true
}

export const validateUpdateUser = (values: IUserProfile) => {
    let errors = {} as any
  
    if (!validateImage(values.avatar as File )) {
        errors.avatar = 'The largest image size is 1mb'
        console.log('error')
    }

    if (values.password) {
        if (values.password.length < 6) {
            errors.password = ' Password must be at least 6 characters'
            console.log('6')
        }
        if (values.cfPassword !== values.password) {
            errors.cfPassword = 'Password not mathced'
            console.log('match')
        }
  }
    
    return errors
}

export const validateBlog = (blog:IBlog) => {
    let errors = {} as any
    if (!validateImage(blog.thumbnail as File)) {
        errors.thumbnail = 'The largest image size is 1mb'
        console.log('error')
    } else if (!blog.thumbnail) {
        errors.thumbnail = 'Thumbnail cannot be left blank'
    }
    if (blog.title.trim().length < 10) {
        errors.title = 'Title has at least 10 characters.'
    } else if (blog.title.trim().length > 50) {
         errors.title = 'Title is up to 50 characters'
    }

    if (blog.content.trim().length < 2000) {
        errors.content = 'Content has at least 2000 characters.'
    } 

    if (blog.description.trim().length < 50) {
        errors.description = 'Description has at least 50 characters.'
    } else if (blog.description.trim().length > 200) {
        errors.description = 'Description is up to 200 characters'
    }

    if (!blog.category) {
        errors.category = 'Category cannot be left blank'
    }

    return errors

}