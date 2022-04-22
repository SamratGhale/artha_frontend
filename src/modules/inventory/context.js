import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import * as FILTER from '../../constants/inventory';
import * as actions from './actions';
import { getUser } from '../../utils/sessionManager';

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
  function toFormData(o) {
    return Object.entries(o).reduce((d,e) => (d.append(...e),d), new FormData())
  }

  async function createInvoice(payload){
    const user = getUser();
    payload.staff_id = user._id;
    const form = toFormData(payload);
    const ret = await Service.createInvoice(form);

    const cart = state.cartItems;

    cart.forEach(async(i)=>{
      await Service.addToInvoice(ret.data._id, toFormData({item_id: i._id, cartQuantity: i.cartQuantity}));
    })
    return ret;
  }

  async function getAllItems() {
    const res = await Service.getAllItem();
    return res;
  }
  async function refreshData() {
    dispatch({ type: actions.REGRESH_DATA, data: true })
  }

  function getDocumentArray(){
    const items = [['','','','']]
    var total = 0;
    const cart = state.cartItems;
    for (let index = 0; index < cart.length; index++) {
      const item = cart[index];
      items[index] = []
      items[index].push(item.item_name)
      items[index].push(item.item_price.toString())
      items[index].push(item.cartQuantity.toString())
      items[index].push(item.total.toString())
      total += item.total;
    }
    return {items, total};
  }

  //for pdf generation of invoice
  function getDocumentDefination(invoice_info){
    const arr = getDocumentArray();
    const items = arr.items;
    var dd = {
      content: [
        { text: 'Artha', style: 'header' },
        { text: 'Sales Invoice', style: 'anotherStyle' },
        {text:`SI = ${invoice_info._id}`, style:"si"},
        {text:`${invoice_info.customer_name}`, style:"customer"},
        {text:`Payment method = ${invoice_info.payment_method}`, style:"customer"},
        
        {
            layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 100, 100, '*' ],
    
            body: [
              [ 'Item Name', 'Unit Price (Rs)', 'Quantity', 'Amount' ],
              ...items,
              [ "", '', {text:"Sub total", bold: true}, arr.total ],
              [ "", '', {text:"Total", bold: true}, arr.total ]
            ]
          },
          style:'table'
        },
        { text: 'Thank you visit again!', style: 'footer' },
        
        
      ],
    
      styles: {
        header: {
          fontSize: 40,
          bold: true,
          alignment:'center'
        },
        anotherStyle: {
          italics: true,
          alignment: 'center',
          lineHeight:2
        },
            customer: {
          alignment: 'left',
          lineHeight:3
        },
        table:{
          lineHeight:2 
        },
        footer: {
          alignment: 'right',
          lineHeight:5
        }
      }
    };
    return dd;
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

    const availableQuantity = Number(invItem[0].quantity);

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

  useEffect(()=>{
    var newItem =state.cartItems;
    newItem.forEach(e=>{
      var item = e;
      var total = Number(e.cartQuantity) * Number(e.item_price);
      total = total - (Number(e.discount)/100 *  total);
      total = total + (Number(e.vat)/100 *  total)
      e.total = total;
    })
    dispatch({ type: actions.SET_CART_DATA, data: newItem})
  },[JSON.stringify(state.cartItems)])

  return (
    <InventoryContext.Provider
      value={{
        items: state.items,
        addItem,
        getAllItems,
        refreshData,
        addToCart,
        cartItems: state.cartItems,
        removeFromCart,
        getDocumentDefination,
        createInvoice,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}