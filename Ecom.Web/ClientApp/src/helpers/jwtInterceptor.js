import React from 'react'
import env from '../env';
import axios from 'axios';



export function jwtInterceptor() {
    // axios.interceptors.request.use(req => {
    //     const token = localStorage.getItem("token");
    //     req.headers.authorization = token;
    //     return req;
    //   });
      
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = localStorage.getItem("token");
        const isLoggedIn = token;
        const isApiUrl = request.url.startsWith(env.API_URL);

        if (isLoggedIn && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${token}`;
        }

        return request;
    });
}
