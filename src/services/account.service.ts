import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {history} from '../helpers/history'
import {fetchWrapper} from '../helpers/fetch-wrapper'

const userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
const baseUrl = process.env.REACT_APP_AAS + `accounts`;

console.log(baseUrl);

type User = {
    created: string,
    email: string,
    firstName: string,
    lastName: string,
    id: number,
    isVerified: boolean,
    jwtToken: string,
    role: string,
    refreshToken: string
}

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
    //update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value }
};

async function login(email: string, password: string) {
    await axios.post(`${baseUrl}/authenticate`, { email: email, password: password })
        .then(response => {

            const user = ({
                jwtToken: response.data.jwtToken,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                isVerified: response.data.isVerified,
                role: response.data.role,
                refreshToken: response.data.refreshToken,
            }) as User;

            sessionStorage.setItem('currentUserToken', user.jwtToken);
            sessionStorage.setItem('userFirstName', user.firstName);
            sessionStorage.setItem('userLastName', user.lastName);
            sessionStorage.setItem('refreshToken', user.refreshToken);
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
    });
    return;
}

// function logout() {
//     let jwtToken = localStorage.getItem('currentUserToken')
//     console.log(jwtToken);
//     //axios({url: `${baseUrl}/revoke-token`, method: 'post', responseType: 'json', headers: {Authorization: `Bearer ${jwtToken}`}});
//     axios.post(`${baseUrl}/revoke-token`, {});
//     localStorage.removeItem('currentUser');
//     stopRefreshTokenTimer();
//     userSubject.next(null);
//     //history.push('/account/login');
// }

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    let refreshToken = sessionStorage.getItem('refreshToken');
    console.log(refreshToken);
    fetchWrapper.post(`${baseUrl}/revoke-token`, {token: refreshToken});
    stopRefreshTokenTimer();
    userSubject.next(null);
    sessionStorage.removeItem('currentUserToken');
    sessionStorage.removeItem('userFirstName');
    sessionStorage.removeItem('userLastName');
    sessionStorage.removeItem('refreshToken');
    history.push('/account/login');
}

function refreshToken() {
    return axios.post(`${baseUrl}/refresh-token`)
    .then(user => {
        console.log(user.data);
        //userSubject.next(user);
        sessionStorage.setItem('refreshToken', user.data.refreshToken);
        startRefreshTokenTimer();
        return user;
    });
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

function getById(id: number) {
    return axios.get(`${baseUrl}/${id}`);
}

function create(params: any) {
    return axios.post(baseUrl, params);
}

/*function update(id: number, params: any) {
    return axios.put(`${baseUrl}/${id}`, params)
        .then(user => {
            if (id === userSubject.value.id) {
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        });
}*/

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