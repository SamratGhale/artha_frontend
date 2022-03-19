import React, { createContext, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import API from '../../constants/api';
import axios from 'axios';
import { getUserToken } from '../../utils/sessionManager';
const access_token = getUserToken();
const USER = API.USER;

const initialState = {
  user_info: {},
  list: [],
  pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
};

export const UserContext = createContext(initialState);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduce, initialState);

  async function userLogin(payload) {
     var form = new FormData();
     form.append("email", payload.email);
     form.append("password", payload.password);
     return await Service.login(form);
  }
  function logout() {
    Service.logout();
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

  async function addUserAndApprove(contract, payload) {
    try {
      await axios.post(
        USER+ `/${payload.address}/approve`,
        {},
        {
          headers: { access_token: access_token }
        }
      );
      return 'User registered';
    } catch (err) {
      return err;
    }
  }
  async function addUserBackend(payload) {
    const { file, userDetails } = payload;
    console.log(JSON.stringify(userDetails));
    if (file == null) {
      return 'no identify file selected';
    }
    try {
      const formData = new FormData();
      formData.append('email', userDetails['email']);
      formData.append('password', userDetails['password']);
      const config = {
        headers: { access_token: access_token }
      };
      axios
        .post(USER, formData, config)
        .then((res) => {
          console.log(res);
          return 'User added successfully!';
        })
        .catch((err) => {});
    } catch (err) {
      console.log(err);
      if (err.data) {
        let arr = err.data.message.split(':');
        return arr[1];
      } else if (err.message) {
        let arr = err.message.split(':');
        return arr[1];
      } else {
        return 'Could not complete transaction';
      }
    }
  }

  async function getAllUser(payload) {
    return await Service.getAllUser(payload);
  }

  return (
    <UserContext.Provider
      value={{
        list: state.list,
        userLogin,
        verifyToken,
        addUserAndApprove,
        getAllUser,
        addUserBackend,
        dispatch,
        addUser,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
