
import axios from 'axios';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:9000/product/getAll");
      console.log(response);

      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: response.data.products 
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};
