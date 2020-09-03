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

async function login(email: string, password: string) {
    let user: any;
    await axios.post(`${baseUrl}/authenticate`, { email: email, password: password })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('currentUser', response.data.jwtToken);
            userSubject.next(response.data);
            startRefreshTokenTimer();
            user = response.data;
    }).catch(error => {
        console.log(error.message);
    });
    return user;
}

function logout() {
    let jwtToken = localStorage.getItem('currentUser')
    //axios({url: `${baseUrl}/revoke-token`, 'content-type': 'text/json', method: 'post', headers: {Authorization: `${jwtToken}`}});
    axios.post(`${baseUrl}/revoke-token`, {Authorization: `${jwtToken}`});
    localStorage.removeItem('currentUser');
    stopRefreshTokenTimer();
    userSubject.next(null);
}

function refreshToken() {
    return axios.post(`${baseUrl}/refresh-token`);
};

function register(params: object) {
    return axios.post(`${baseUrl}/register`, params);
}

function verifyEmail(token: string | string[]) {
    return axios.post(`${baseUrl}/verify-email`, { token });
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