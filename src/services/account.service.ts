import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

const userSubject = new BehaviorSubject(null);
const baseUrl = process.env.REACT_APP_AAS + `accounts`;

export const accountService = {
    login,
    logout,
    refreshToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value }
};

function login(email: any, password: any) {
    const user = axios.post(`${baseUrl}/authenticate`, { email: email, password: password });
    userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    startRefreshTokenTimer();
    return user;
}

function logout() {
    axios.post(`${baseUrl}/revoke-token`, {});
    localStorage.removeItem('currentUser');
    stopRefreshTokenTimer();
    userSubject.next(null);
    //history.push('/account/login');
}

function refreshToken() {
    return axios.post(`${baseUrl}/refresh-token`);
};

function register(params: object) {
    return axios.post(`${baseUrl}/register`, params);
}

function verifyEmail(token: string | string[]) {
    return axios.post(`${baseUrl}/verif-email`, { token });
}

function forgotPassword(email: string) {
    return axios.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token: string){
    return axios.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
    return axios.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
}

function getAll() {
    return axios.get(baseUrl);
}

function getById(id: any) {
    return axios.get(`${baseUrl}/${id}`);
}

function create(params: any) {
    return axios.post(baseUrl, params);
}

function update(id: any, params: any) {
    return axios.put(`${baseUrl}/${id}`, params)
        .then(user => {
            if (id === userSubject.value.id) {
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        });
}

function _delete(id: any) {
    return axios.delete(`${baseUrl}/${id}`)
        .then(x => {
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

let refreshTokenTimeout: NodeJS.Timeout;

function startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}