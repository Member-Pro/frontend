import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import store from '../store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // TODO: increase API calls

  // TODO: get access token for user
  // let accessToken = '';

  return config;
},
(error: AxiosError) => {
  // TODO: decrease API calls
  Promise.reject(error);
});

instance.interceptors.response.use((response: AxiosResponse) => {
  // TODO: decrease API calls

  return response;
}, _ => {
  // TODO: decrease API calls
});

const Api = {
  get(resource: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return instance.get(resource, config);
  },

  post(resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return instance.post(resource, data, config);
  },

  put(resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return instance.put(resource, data, config);
  },

  delete(resource: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return instance.delete(resource, config);
  },
};

export default Api;
