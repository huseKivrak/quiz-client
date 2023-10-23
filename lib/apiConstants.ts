/**
 * Base URLs for dj-rest-auth endpoints (https://tinyurl.com/ywoz6nkw)
 */
export const AUTH_BASE_URL: string = 'http://localhost:8000/auth/';

export const AUTH_LOGIN_URL: string = `${AUTH_BASE_URL}login/`;
export const AUTH_LOGOUT_URL: string = `${AUTH_BASE_URL}logout/`;
export const AUTH_PASSWORD_CHANGE_URL: string = `${AUTH_BASE_URL}password/change/`;
export const AUTH_PASSWORD_RESET_URL: string = `${AUTH_BASE_URL}password/reset/`;
export const AUTH_PASSWORD_RESET_CONFIRM_URL: string = `${AUTH_BASE_URL}password/reset/confirm/`;
export const AUTH_USER_URL: string = `${AUTH_BASE_URL}user/`;
export const AUTH_TOKEN_VERIFY_URL: string = `${AUTH_BASE_URL}token/verify/`;
export const AUTH_TOKEN_REFRESH_URL: string = `${AUTH_BASE_URL}token/refresh/`;
export const AUTH_REGISTRATION_URL: string = `${AUTH_BASE_URL}registration/`;
export const AUTH_REGISTRATION_VERIFY_EMAIL_URL: string = `${AUTH_BASE_URL}registration/verify-email/`;
export const AUTH_REGISTRATION_RESEND_EMAIL_URL: string = `${AUTH_BASE_URL}registration/resend-email/`;

/**
 * Base URLs for DRF API endpoints
 */
export const API_BASE_URL: string = 'http://localhost:8000/api/';
