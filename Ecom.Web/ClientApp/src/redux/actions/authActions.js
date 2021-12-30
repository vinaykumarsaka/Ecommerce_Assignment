import axios from "axios"
import { login, signUp } from '../../services'
import { history } from "../../helpers"
import { Routes, Route, BrowserRouter as Router,Navigate,Outlet } from 'react-router-dom'

const AuthActionType = {
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAIL: 'SIGN_IN_FAIL'
}

const RegisterAuthAction = (signUpParams) => {
    return async (dispatch) => {
        try {
            const data =await signUp(signUpParams);
            console.log(data.data);
            
            dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data.data })
        }
        catch (error) {
            debugger;
            //console.error(error);
            dispatch({ type: AuthActionType.REGISTER_FAIL, payload: {} })
        }

    }
}
const SignInAuthAction = (loginModelParams) => {
    return async (dispatch) => {
        try {
            const data =await login(loginModelParams);
            console.log(data.data);
            localStorage.setItem("token", data.data.bearerToken);
            localStorage.setItem("username", data.data.name);
          //  const testData = await axios.get('/weatherforecast');
            dispatch({ type: AuthActionType.SIGN_IN_SUCCESS, payload: data.data })
        }
        catch (error) {
            debugger;
            //console.error(error);
            dispatch({ type: AuthActionType.SIGN_IN_FAIL, payload: {} })
        }

    }
}

export { RegisterAuthAction, AuthActionType,SignInAuthAction }