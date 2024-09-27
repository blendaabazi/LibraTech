import axios from 'axios';
const API_BASE_URL = 'http://localhost:5170';


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

const refreshToken = async () => {
    const refreshToken = localStorage.getItem('RefreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/api/Authorization/refresh-token`, {
            RefreshToken: refreshToken,
        });
       
        localStorage.setItem('Token', response.data.Token);
        localStorage.setItem('refresh-token', response.data.RefreshToken);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Krijoni një Promise që ruan se cilat kërkesa janë në pritje për rinovimin e token-it
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};


axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(async (resolve, reject) => {
                try {
                    const data = await refreshToken();
                    const { Token } = data;

                    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + Token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + Token;
                    processQueue(null, Token);

                   
                    window.dispatchEvent(new CustomEvent('tokenRefreshed', { detail: { token: Token, expiration: new Date().getTime() + 120000 } }));

                    resolve(axiosInstance(originalRequest));
                } catch (err) {
                    processQueue(err, null);
                    reject(err);
                } finally {
                    isRefreshing = false;
                }
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
