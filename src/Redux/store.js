

import { cartReducer} from './Reducers';
import productReducer from './productReducer'; 

import { configureStore } from '@reduxjs/toolkit';



export default configureStore({
  reducer: {
    Cart: cartReducer,
    Products: productReducer,
  },
});

