import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

class jwtService extends FuseUtils.EventEmitter {

    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if (err && err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {
        let access_token = this.getAccessToken();

        if (!access_token) {
            this.emit('onNoAccessToken');

            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        if (response.data.user)
                            this.setUserType(response.data.user.type);

                        resolve(response.data.user);
                    } else {
                        reject(response.data.error);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    };

    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', {
                email,
                password
            }).then(response => {
                // for test ...
                response.data = {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJtYWlsIjoiVGVzdEB0ZXN0LnRlc3QiLCJ0eXBlIjoxLCJDb21wYW55SUQiOjJ9LCJpYXQiOjE1NzQ0MTE3MjB9.yEI5-GxIIfE8qAZWFWsxIH35QikPHE3jpoHX4ewqCMo",
                    user: {
                        id: 1,
                        mail: "test@test.test",
                        type: 1,
                        companyId: 1
                    }
                }
                //

                if (response.data.user) {
                    this.setSession(response.data.token);
                    if (response.data.user)
                        this.setUserType(response.data.user.type);

                    resolve(response.data.user);
                } else {
                    reject(response.data.error);
                }
            }).catch(error => {
                // for test ...
                const response = {
                    data: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJtYWlsIjoiVGVzdEB0ZXN0LnRlc3QiLCJ0eXBlIjoxLCJDb21wYW55SUQiOjJ9LCJpYXQiOjE1NzQ0MTE3MjB9.yEI5-GxIIfE8qAZWFWsxIH35QikPHE3jpoHX4ewqCMo",
                        user: {
                            id: 1,
                            mail: "test@test.test",
                            type: 1,
                            companyId: 1
                        }
                    }
                }
                
                if (response.data.user) {
                    this.setSession(response.data.token);
                    if (response.data.user)
                        this.setUserType(response.data.user.type);

                    resolve(response.data.user);
                } else {
                    reject(response.data.error);
                }
                //

                // reject(error);
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            // We need a new api to login with JWT ...
            // axios.get('/api/auth/access-token', {
            //     data: {
            //         access_token: this.getAccessToken()
            //     }
            // }).then(response => {
            axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', {
                email: "test@test.test",
                password: "password"
            }).then(response => {
                if ( response.data.user ) {
                    this.setSession(response.data.token);
                    if (response.data.user)
                        this.setUserType(response.data.user.type);

                    resolve(response.data.user);
                } else {
                    this.logout();
                    reject('Failed to login with token.');
                }
            })
            .catch(error => {
                this.logout();
                reject('Failed to login with token.');
            });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if ( access_token ) {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        } else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
        this.setUserType(-1);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };

    setUserType = user_type => {
        if (user_type === -1) {
            localStorage.removeItem('user_type');
        } else {
            // localStorage.setItem('user_type', user_type);

            // for test ...
            localStorage.setItem('user_type', 1);
            //
        }
    };

    getUserType = () => {
        return parseInt(window.localStorage.getItem('user_type'));
    };

}

const instance = new jwtService();

export default instance;