// export const hi = ''
// const devEnv = process.env.NODE_ENV === 'development'

// const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env

// export const API_URL =  process.env.REACT_APP_DEV_URL 
export let apiUrl: string | undefined = process.env.NODE_ENV==='production'
    ? process.env.REACT_APP_PROD_URL
    : process.env.REACT_APP_DEV_URL;

export const LOGIN_URL = '/api/login'
export const REGISTER_URL = '/api/register'
export const ACTIVATE_URL = '/api/active'
export const REFRESH_URL = '/api/refresh_token'
export const LOGOUT_URL = '/api/logout'
export const SEND_OTP_URL = '/api/login_sms'
export const VERIFY_OTP_URL = '/api/sms_verify'
export const UPDATE_USER = '/api/update_user'
export const RESET_PASSWORD = '/api/reset_password'
export const CATEGORY_URL = '/api/category';
export const CREATE_BLOG_URL = '/api/blog'
export const HOME_BLOGS_URL = '/api/home/blogs';
export const CREATE_COMMENT_URL = '/api/comment'
export const REPLY_COMMENT_URL = '/api/reply_comment'