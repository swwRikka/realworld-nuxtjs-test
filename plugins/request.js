import axios from 'axios'
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})
const needAuthURL = [
  '/api/articles'
]
export default ({store}) => {
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}