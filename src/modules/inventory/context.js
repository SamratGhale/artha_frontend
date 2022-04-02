import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import * as FILTER from '../../constants/inventory';
import * as actions from './actions';

const initialState = {
  items: [],
  cartItems: [],
  refresh: false,
  filter: FILTER.ALL,
  pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const InventoryContext = createContext(initialState);

export const InventoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduce, initialState);

  async function addItem(payload) {
    const form = Object.entries(payload).reduce((d, e) => (d.append(...e), d), new FormData());
    const res = await Service.addItem(form);
    return res;
  }

  async function getAllItems() {
    const res = await Service.getAllItem();
    return res;
  }
  async function refreshData() {
    dispatch({ type: actions.REGRESH_DATA, data: true })
  }

  function addToCart(item, quantity) {

    var data = state.cartItems;
    const q = Number(quantity);

    if (Number(item.quantity) < q) {
      return { success: false, message: "Not enough quantity" }
    }

    const obj = data.filter((e) => e._id == item._id);

    var newInv = state.items;

    const invItem = newInv.filter((e) => e._id == item._id);

    const invIdx = newInv.indexOf(invItem[0]);

    newInv[invIdx].quantity = Number(item.quantity) - q;

    const index = data.indexOf(obj[0]);


    if (index != -1) {
      data[index].cartQuantity += q;
    } else {
      item.cartQuantity = q;
      data = data.concat(item);
    }
    dispatch({ type: actions.SET_INVENTORY, data: newInv })
    dispatch({ type: actions.SET_CART_DATA, data: data })
    return { success: true, message: `Added ${quantity} ${item.item_name}to cart` }
  }

  function removeFromCart(item, quantity) {

    var newCart = state.cartItems;
    var newInv = state.items;



    const obj = newCart.filter((e) => e._id == item._id);

    const invItem = newInv.filter((e) => e._id == item._id);

    const newQuantity = Number(quantity);

    const oldQuantity = Number(item.cartQuantity);

    const availableQuantity = Number(invItem.quantity);

    if (newQuantity > oldQuantity + availableQuantity) {
      return { success: false, message: "quanity not available" }
    }


    const invIdx = newInv.indexOf(invItem[0]);

    newInv[invIdx].quantity = Number(item.quantity) + oldQuantity - newQuantity;
    const index = newCart.indexOf(obj[0]);

    if (index != -1) {
      if(newQuantity == 0){
        newCart.splice(index,1);
        dispatch({ type: actions.SET_INVENTORY, data: newInv })
        dispatch({ type: actions.SET_CART_DATA, data: newCart })
        return { success: true, message: `Removed ${item.item_name} from cart` }
      }else{
        newCart[index].cartQuantity = newQuantity;
      }
    }

    dispatch({ type: actions.SET_INVENTORY, data: newInv })
    dispatch({ type: actions.SET_CART_DATA, data: newCart})
    return { success: true, message: `Changed ${item.item_name}'s quantity to ${newQuantity}` }
  }

  useEffect(() => {
    if (state.refresh === true) {
      try {
        Service.getAllItem(state.filter).then((data) => {
          dispatch({ type: actions.SET_INVENTORY, data: data });
          dispatch({ type: actions.REGRESH_DATA, data: false });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [state.refresh]);

  return (
    <InventoryContext.Provider
      value={{
        items: state.items,
        addItem,
        getAllItems,
        refreshData,
        addToCart,
        cartItems: state.cartItems,
        removeFromCart
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}