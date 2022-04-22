import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import API from '../../constants/api';
import axios from 'axios';
import { getUserToken } from '../../utils/sessionManager';
import actions from './actions';
const access_token = getUserToken();
const USER = API.USER;

const initialState = {
  user_info: {},
  list: [],
  refresh: false
};

export const UserContext = createContext(initialState);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduce, initialState);

  async function userLogin(payload) {
     var form = new FormData();
     form.append("email", payload.email);
     form.append("password", payload.password);
     const ret = await Service.login(form);
     dispatch({type: actions.SET_USER, data: ret.data});
     return ret;
  }
  function logout() {
    Service.logout();
  }
  async function getAllRoles(){
    return Service.getAllRoles();
  }
  async function verifyToken(token) {
    return new Promise((resolve, reject) => {
      Service.verifyToken(token)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async function addUser(payload) {
     var form = new FormData();
     form.append("email", payload.email);
     form.append("password", payload.password);
     form.append("role", payload.role);
    return await Service.addUser(form);
  }


  async function getAllUser() {
    try{
      const res = await Service.getAllUser();
      console.log(res.data)
      dispatch({type: actions.SET_LIST, data: res.data} )
    }catch(err){
      console.log(err)
    }
  }

  async function refreshData(){
      dispatch({type: actions.REFRESH_DATA})
  }
  async function approveUser(id){
    try{
      await Service.approveUser(id);
      dispatch({type: actions.REFRESH_DATA} )
    }catch(err){
      throw err;
    }
  }

  async function updateUser(id, data){
    try{
      await Service.updateUser(id, data);
      dispatch({type: actions.REFRESH_DATA} )
    }catch(err){
      throw err;
    }
  }

  useEffect(async()=>{
    if(state.refresh === true){
      await getAllUser();
      dispatch({type: actions.REFRESH_DATA})
    }
  },[state.refresh])

  return (
    <UserContext.Provider
      value={{
        list: state.list,
        userLogin,
        verifyToken,
        getAllUser,
        refreshData,
        dispatch,
        addUser,
        logout,
        getAllRoles,
        approveUser,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
