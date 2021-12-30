
import {ProductActionTypes } from '../actions/productActions';
const intialState={
    products:[]
}
const ProductReducer = (state =intialState,{type,payload}) => {
   switch(type)
   {
       case ProductActionTypes.SET_PRODUCTS:
           return {...state,products: payload};
        default:
        return state;

   }
}

export default ProductReducer;