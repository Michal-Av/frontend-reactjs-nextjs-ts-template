/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const url: string | undefined = process.env.NEXT_PUBLIC_URL_AUTH;


export const getCsrfToken = async (): Promise<string> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/csrf-token`, { withCredentials: true });
  return response.data.csrfToken;
};

export const login = async (username: string, password: string): Promise<any> => {
  const csrfToken = await getCsrfToken();
  const details = { email: username, password: password };
    return axios.post(`${url}/login`, details, { withCredentials: true, headers: {
      'CSRF-Token': csrfToken, // Send CSRF token in the headers
  }, })
      .then((response) => {
        return response.data;
      });
}

export const logout = async (): Promise<any> => {
  const csrfToken = await getCsrfToken();
    return axios
      .post(`${url}/logout`, {}, { withCredentials: true, headers: {
        'CSRF-Token': csrfToken, // Send CSRF token in the headers
    }, }).then((response) => {
        return response.data;
      });
}

export const signup = async (email: string, username: string, password: string): Promise<any> => {
  const csrfToken = await getCsrfToken();
    const details = { email: email, username: username, password: password };
    return axios
      .post(`${url}/signup`, details, { withCredentials: true, headers: {
        'CSRF-Token': csrfToken, // Send CSRF token in the headers
    }, }).then((response) => {
        return response.data;
      });
}

export const forgot_pass = async (email: string): Promise<any> => {
  const csrfToken = await getCsrfToken();
  const mail = { email: email };
  return axios
    .post(`${url}/forgot-password`, mail ,{ withCredentials: true, headers: {
      'CSRF-Token': csrfToken, // Send CSRF token in the headers
  }, })
    .then((response) => {
      return response.data;
    });
}

export const resetPassword = async (token: string, newPassword: string): Promise<any> => {
  const csrfToken = await getCsrfToken();
  const data = { token, newPassword };
  return axios
    .post(`${url}/reset-password`, data, { withCredentials: true, headers: {
      'CSRF-Token': csrfToken, // Send CSRF token in the headers
  }, })
    .then((response) => {
      return response.data;
    });
}
