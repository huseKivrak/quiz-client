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
// Base URL
export const API_BASE_URL: string = 'http://localhost:8000/api/v1/';

// Quiz URLs
export const API_QUIZZES_URL: string = `${API_BASE_URL}quizzes/`;
export const getQuizDetailURL = (slug: string) =>
  `${API_BASE_URL}quizzes/${slug}/`;

// Question URLs
export const API_QUESTIONS_URL: string = `${API_BASE_URL}questions/`;
export const getQuestionDetailURL = (slug: string) =>
  `${API_BASE_URL}questions/${slug}/`;

// Answer URLs
export const API_ANSWERS_URL: string = `${API_BASE_URL}answers/`;
export const getAnswerDetailURL = (slug: string) =>
  `${API_BASE_URL}answers/${slug}/`;
