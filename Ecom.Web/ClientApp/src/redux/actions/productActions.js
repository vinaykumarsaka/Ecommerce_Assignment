
const ProductActionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
   
}

 const setProducts=(products)=>{
    return {
        type:ProductActionTypes.SET_PRODUCTS,
        payload:products,
    }
}

export {ProductActionTypes,setProducts}