/**
 * Base URLs for dj-rest-auth endpoints (https://tinyurl.com/ywoz6nkw)
 */
const BASE_URL: URL = 'http://localhost:8000/';

const AUTH_BASE_URL: URL = `${BASE_URL}auth/`;
const API_BASE_URL: URL = `${BASE_URL}api/v1/`;

type URL = string;
type ID = number | string;

//Generic function for detail URLs:
const getDetailURL = (base: URL, id: ID): URL => `${base}${id}/`;

export const AUTH_LOGIN_URL: URL = `${AUTH_BASE_URL}login/`;
export const AUTH_LOGOUT_URL: URL = `${AUTH_BASE_URL}logout/`;
export const AUTH_PASSWORD_CHANGE_URL: URL = `${AUTH_BASE_URL}password/change/`;
export const AUTH_PASSWORD_RESET_URL: URL = `${AUTH_BASE_URL}password/reset/`;
export const AUTH_PASSWORD_RESET_CONFIRM_URL: URL = `${AUTH_BASE_URL}password/reset/confirm/`;
export const AUTH_USER_URL: URL = `${AUTH_BASE_URL}user/`;
export const AUTH_TOKEN_VERIFY_URL: URL = `${AUTH_BASE_URL}token/verify/`;
export const AUTH_TOKEN_REFRESH_URL: URL = `${AUTH_BASE_URL}token/refresh/`;
export const AUTH_REGISTRATION_URL: URL = `${AUTH_BASE_URL}registration/`;
export const AUTH_REGISTRATION_VERIFY_EMAIL_URL: URL = `${AUTH_BASE_URL}registration/verify-email/`;
export const AUTH_REGISTRATION_RESEND_EMAIL_URL: URL = `${AUTH_BASE_URL}registration/resend-email/`;

/**
 * Base URLs for DRF API endpoints
 */

// Quiz URLs
export const API_QUIZZES_URL: URL = `${API_BASE_URL}quizzes/`;
export const getQuizDetailURL = (slug: ID) =>
  getDetailURL(API_QUIZZES_URL, slug);
// Question URLs
export const API_QUESTIONS_URL: URL = `${API_BASE_URL}questions/`;
export const getQuestionDetailURL = (id: ID) =>
  getDetailURL(API_QUESTIONS_URL, id);

// Answer URLs
export const API_ANSWERS_URL: URL = `${API_BASE_URL}answers/`;
export const getAnswerDetailURL = (id: ID) => getDetailURL(API_ANSWERS_URL, id);

///////////////
// Attempts ///
///////////////
// QuizAttempt URLs
export const API_QUIZ_ATTEMPTS_URL: URL = `${API_BASE_URL}quiz_attempts/`;
export const getQuizAttemptDetailURL = (id: ID) =>
  getDetailURL(API_QUIZ_ATTEMPTS_URL, id);

// QuestionAttempt URLs
export const API_QUESTION_ATTEMPTS_URL: URL = `${API_BASE_URL}question_attempts/`;
export const getQuestionAttemptDetailURL = (id: ID) =>
  getDetailURL(API_QUESTION_ATTEMPTS_URL, id);
