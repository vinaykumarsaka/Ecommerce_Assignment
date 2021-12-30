import { getToken } from '../services'
import { Routes, Route, BrowserRouter as Router,Navigate,Outlet } from 'react-router-dom'

import React from 'react';

const PrivateRoute = () => {
    const account = getToken(); // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return account ? <Outlet /> : <Navigate to="/auth" />;
}

export { PrivateRoute };