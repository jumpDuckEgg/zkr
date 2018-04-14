import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';
const UserInfo = 'userInfo';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(UserInfo)
}

export function setUserInfo(data) {
  return Cookies.set(UserInfo, data)
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}
