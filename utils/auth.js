import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userNameKey='User-Name'
const userIdKey='User-ID'
const userAvatarKey='User-Avatar'
const unReadMessageKey='User-UnReadMessage'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{expires:365})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get(userNameKey)
}

export function setUserName(username) {
  return Cookies.set(userNameKey, username)
}

export function removeUserName() {
  return Cookies.remove(userNameKey)
}

export function getUserId() {
  return Cookies.get(userIdKey)
}

export function setUserId(userId) {
  return Cookies.set(userIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(userIdKey)
}
export function getUserAvatar() {
  return Cookies.get(userAvatarKey)
}

export function setUserAvatar(userId) {
  return Cookies.set(userAvatarKey, userId)
}

export function removeUserAvatar() {
  return Cookies.remove(userAvatarKey)
}

export function setUnReadMessage(unReadMessage) {
  return Cookies.set(unReadMessageKey, unReadMessage)
}
export function getUnReadMessage() {
  return Cookies.get(unReadMessageKey)
}
export function removeUnReadMessage() {
  return Cookies.remove(unReadMessageKey)
}