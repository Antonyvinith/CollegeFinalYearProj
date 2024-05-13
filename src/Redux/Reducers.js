const initialState = { cart: [] };
export const cartReducer = (state = initialState, action) => {
  console.log("initialState",initialState)
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (c) => c.productReference !== action.payload.productReference
        ),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload.id ? { ...c, qty: action.payload.qty } : c
        ),
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
