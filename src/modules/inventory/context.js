import React, { createContext, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import API from '../../constants/api';
import axios from 'axios';
import { getUserToken } from '../../utils/sessionManager';
const access_token = getUserToken();


const initialState = {
    items: [],
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const InventoryContext = createContext(initialState);

export const InventoryContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(userReduce, initialState);

    async function addItem(payload) {
       console.log(payload); 
       return "haha";
    }

    async function getAllItems(){
        const res = await Service.getAllItem();
        return res;
    }
}