import axios, { AxiosError, AxiosResponse } from "axios";
import { User, UserFormValues } from "../models/user";
import {
  SystemName,
  ISystemReport,
  SystemReportFormValues,
  ISystemReportStatus,
} from "../models/systemReport";
import { store } from "../stores/store";
import { router } from "../router/Routes";
import { toast } from "react-toastify";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const accountsURL = process.env.REACT_APP_AAS;
const systemReportsURL = process.env.REACT_APP_SYSTEMREPORTS;

axios.interceptors.request.use((config) => {
  //config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json";
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }

        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        toast.error("not found");
        break;
      case 500:
      case 415:
        //store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  _delete: <T>(url: string, body: {}) =>
    axios.delete<T>(url, body).then(responseBody),
};

const Accounts = {
  current: () => requests.get<User>(`${accountsURL + "accounts"}`),
  login: (user: UserFormValues) =>
    requests.post<User>(`${accountsURL + "accounts/login"}`, user),
  register: (user: UserFormValues) =>
    requests.post<User>(`${accountsURL + "accounts/register"}`, user),
  //logout: () =>
  verify: (token: JSON) => {
    let newToken = `{"token":"${token}"}`;
    requests.post<boolean>(
      `${accountsURL + "accounts/verify-email"}`,
      newToken
    );
  },
};

const SystemReports = {
  getAllReports: () =>
    requests.get<ISystemReport[]>(`${systemReportsURL + "systemreports/"}`),
  getReportById: (id: number) =>
    requests.get<ISystemReport>(
      `${systemReportsURL + "systemReports/"}` + `${id}`
    ),
  createReport: (systemReport: SystemReportFormValues) =>
    requests.post<SystemReportFormValues>(
      `${systemReportsURL + "systemReports/"}`,
      systemReport
    ),
  updateReport: (systemReport: SystemReportFormValues) =>
    requests.put<SystemReportFormValues>(
      `${systemReportsURL + "systemReports/"}`,
      systemReport
    ),
};

const SystemNames = {
  getAllSystemNames: () =>
    requests.get<SystemName[]>(
      `${systemReportsURL}SystemNames/GetAllSystemNames`
    ),
};

const SystemReportStatuses = {
  getAllSystemReportStatuses: () =>
    requests.get<ISystemReportStatus[]>(
      `${systemReportsURL}systemreportstatus`
    ),
};

const SystemStatus = {
  getSystemStatus: () => requests.get<string>(`${systemReportsURL}status`),
};

const agent = {
  Accounts,
  SystemReports,
  SystemNames,
  SystemReportStatuses,
  SystemStatus,
};

export default agent;
