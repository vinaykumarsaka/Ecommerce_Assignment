import React from 'react'
import { AuthActionType } from '../actions/authActions';

const authState = {
    isLoggedIn: false,
    user: {

    }
}

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case AuthActionType.SIGN_IN_SUCCESS:

            return {
                isLoggedIn: true,
                user: action.payload
            }
        case AuthActionType.SIGN_IN_FAIL:
            return {
                isLoggedIn: false,
                user: {}
            }
        case AuthActionType.REGISTER_SUCCESS:
            return {
                isLoggedIn: false,
                user: action.payload
            }
        case AuthActionType.REGISTER_FAIL:
            return {
                isLoggedIn: false,
                user: {}
            }
        default:
            return state;
    }
}

export default authReducer;
