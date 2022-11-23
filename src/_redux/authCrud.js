import axios from "axios";

export const LOGIN_URL = "https://oversight.trovefinance.io/api/auth/login";
export const REQUEST_OTP_URL = "https://oversight.trovefinance.io/api/auth/2fa-otp";
export const ME_URL = "https://oversight.trovefinance.io/api/admins/me";


export function login(email, password) {
    return axios.post(LOGIN_URL, { email, password });
}

export function otpValidation(values) {
    return axios.post(REQUEST_OTP_URL, { ...values });
}

export function getUserByToken() {
    // Authorization head should be fulfilled in interceptor.
    return axios.get(ME_URL);
  }