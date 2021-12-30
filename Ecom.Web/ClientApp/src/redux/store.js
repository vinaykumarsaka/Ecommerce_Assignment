import { createStore, applyMiddleware,compose,combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/AuthReducer";
import productReducer from "./reducers/ProductReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers= combineReducers({
    allProducts:productReducer,
    authenticationReducer:authReducer
    
})
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));
export default store;