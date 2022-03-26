import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import API from '../../constants/api';
import axios from 'axios';
import { getUserToken } from '../../utils/sessionManager';
import * as FILTER from '../../constants/inventory';
import * as actions from './actions';
const access_token = getUserToken();


const initialState = {
    items: [],
    refresh: false,
    filter:FILTER.ALL, 
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const InventoryContext = createContext(initialState);

export const InventoryContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(userReduce, initialState);

    async function addItem(payload) {
       const form = Object.entries(payload).reduce((d,e) => (d.append(...e),d), new FormData())
       const res =await Service.addItem(form);
       return res; 
    }

    async function getAllItems(){
        const res = await Service.getAllItem();
        return res;
    }
    async function refreshData(){
        dispatch({type: actions.REGRESH_DATA, data: true})
    }

    useEffect(() => {
      if (state.refresh === true) {
        try {
          Service.getAllItem(state.filter).then((data) => {
            dispatch({ type: actions.SET_INVENTORY, data: data });
            dispatch({ type: actions.REGRESH_DATA, data: false});
          });
        } catch (err) {
          console.log(err);
        }
      }
    }, [state.refresh]);

    return(
        <InventoryContext.Provider
        value={{
            items: state.items,
            addItem,
            getAllItems,
            refreshData,
        }}
        >
            {children}
        </InventoryContext.Provider>
    )
}