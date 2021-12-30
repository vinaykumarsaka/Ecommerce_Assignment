import { useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RegisterAuthAction,SignInAuthAction } from '../../redux/actions/authActions';
import { history } from '../../helpers'

import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom'
import { login } from '../../services';

const AuthForm = () => {
    const navigate = useNavigate()
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const userNameInputRef = useRef();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        emailInputRef.current.value='';
        passwordInputRef.current.value='';
        //userNameInputRef.current.value='';
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const loginModelParams = {
            UserName: emailInputRef.current.value,
            PassWord: passwordInputRef.current.value
        }
        console.log(loginModelParams);
        dispatch(SignInAuthAction(loginModelParams)).then((data) => {
            navigate('/')
        });
    }

    const signUp = (event) => {
        event.preventDefault();
        const signUpParams = {
            Email: emailInputRef.current.value,
            UserName: userNameInputRef.current.value,
            PassWord: passwordInputRef.current.value
        }
        console.log();
        dispatch(RegisterAuthAction(signUpParams)).then((data) => {
            emailInputRef.current.value='';
            passwordInputRef.current.value='';
            userNameInputRef.current.value='';
            setIsLogin((prevState) => !prevState);
        });
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={isLogin ? submitHandler : signUp}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                {!isLogin &&
                <div className={classes.control}>
                    <label htmlFor='Username'>UserName</label>
                    <input type='Username' id='username' required ref={userNameInputRef} />
                </div>}
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};



export default AuthForm;
