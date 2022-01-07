import { Routes, Route, BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import classes from './MainNavigation.module.css';
// import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services'

const MainNavigation = () => {
    const navigate = useNavigate();
    function logoutHandler() {
        localStorage.setItem("token", "")
        localStorage.setItem("username", "")
        navigate('/auth');
    }
    const account = getToken();

    return (
        <header className={classes.header}>
            <nav>
            {account &&<ul>
                    <li className="text-right">
                        <button onClick={logoutHandler} >Logout</button>
                    </li>
                    <li className="text-right">
                        <button onClick={()=>{ navigate('/products')}}> Products</button>
                    </li>
                    <li className="text-right">
                        <button onClick={()=>{ navigate('/cart')}}> Cart </button>
                    </li>
                </ul>}
            </nav>
        </header>
    );
};

export default MainNavigation;
