import actions from "./actions";

const reducer= (state, action)=>{
    switch (action.type) {
    case actions.SET_INVENTORY:
        return {...state, items:action.data}
    case actions.REGRESH_DATA:
        return {...state, refresh: action.data}
    case actions.SET_CART_DATA:
        return {...state, cartItems: action.data}
    }
}
export default reducer;