import { PATH_PAGE } from "../routes/paths";

export function getUser() {
    if (
      localStorage.getItem('currentUser') &&
      Object.keys(localStorage.getItem('currentUser')).length
    ) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
    return null;
  }
  
  export function saveUser(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }
  
  export function saveUserRoles(roles) {
    localStorage.setItem('userRoles', JSON.stringify(roles));
  }
  
  export function getUserRoles() {
    return JSON.parse(localStorage.getItem('userRoles'));
  }
  
  export function saveUserToken(token) {
    localStorage.setItem('token', token);
  }
  
  export function saveUserPermissions(perms) {
    localStorage.setItem('userPermissions', perms);
  }
  
  export function getUserPermissions() {
    if (
      localStorage.getItem('userPermissions') &&
      Object.keys(localStorage.getItem('userPermissions')).length
    ) {
      return JSON.parse(localStorage.getItem('userPermissions'));
    }
    return [];
  }
  
  export function logoutUser() {
    localStorage.clear();
    window.location = PATH_PAGE.auth.login;
  }
  
  export function getUserToken() {
    return localStorage.getItem('token');
  }
  
  export function getUserSignature() {
    return localStorage.getItem('signature');
  }
  
  export function getSignedData() {
    return localStorage.getItem('signingMessage');
  }
  
  export function getCurrentSigner() {
    return localStorage.getItem('signer');
  }
  