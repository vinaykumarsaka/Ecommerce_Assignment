import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import AuthForm from './components/Auth/AuthForm';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import { PrivateRoute } from './components/privateRoute';
import {history} from './helpers'
import { Fragment } from 'react';
import ProductList from './components/Product/ProductList'
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
function App() {
  return (
    <div>
    <Layout/>
     
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/products' element={<ProductList />} />
            <Route exact path='/cart' element={<ShoppingCart/>} />
          </Route>
          <Route exact path='/auth' element={<AuthForm />} />
          

        </Routes>
    
    </div>
  );
}

export default App;
