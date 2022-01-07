import env from '../env';
import {history} from '../helpers';
import axios from 'axios';


const baseUrl = `${env.API_URL}`;
export async function login(loginModelParams)
{
    return await axios.post(`${baseUrl}/account/login`, loginModelParams);
}

export async function signUp(signUpParams)
{
    debugger;
    return await axios.post(`${baseUrl}/account/register`,signUpParams);
}




export function getToken()
{
    return localStorage.getItem("token");
}