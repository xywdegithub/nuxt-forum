import { getToken, setToken, removeToken, getUserAvatar, getUserName, getUserId, setUserName, setUserId, setUserAvatar, removeUserName, removeUserId, removeUserAvatar, setUnReadMessage, removeUnReadMessage, getUnReadMessage,removeIsAdmin,setIsAdmin } from '@/utils/auth';
import { login, register, findSiteUser, loginout } from '@/network/user'
 const cookieparser = process.server ? require('cookieparser') : undefined
export const state = (context) => ({
  user: {
    token: '',
    avatar: '',
    name: '',
    userId: '',
    unReadMessage: 0,
    isAdmin:false
  }
})
export const getters = {
  getToken(state) {
    return state.user.token
  },
  getAvatar(state) {
    return state.user.avatar
  },
  getName(state) {
    return state.user.name
  },
  getUserId(state) {
    return state.user.userId
  },
  getUserId(state) {
    return state.user.userId
  },
  getUnReadMsg(state) {
    return state.user.unReadMessage
  },
  getIsAdmin(state) {
    return state.user.isAdmin
  }
}
export const mutations = {
  SET_TOKEN: (state, token) => {
    state.user.token = token
  },
  SET_NAME: (state, name) => {
    state.user.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.user.avatar = avatar
  },
  SET_UserId: (state, userId) => {
    state.user.userId = userId
  },
  SET_UnReadMessage: (state, unReadMessage) => {
    state.user.unReadMessage = unReadMessage
  },
  SET_IsAdmin: (state, isAdmin) => {
    state.user.isAdmin = isAdmin
  },
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let cookie = req.headers.cookie;
    if(cookie){
      let parsed = cookieparser.parse(cookie)
      try {
        // 将Cookie中user的值转为JavaScript对象
        commit('SET_TOKEN', parsed['Admin-Token'])
        commit('SET_NAME', parsed['User-Name']);
        commit('SET_AVATAR', parsed['User-Avatar'])
        commit('SET_UserId', parsed['User-ID'])
        commit('SET_UnReadMessage', parsed['User-UnReadMessage'])
        commit('SET_IsAdmin', parsed['User-IsAdmin'])

      } catch (err) {
        console.log(err)
        // No valid cookie found
      }
    }
  },
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userName, password).then(response => {
        let data = response.data
        commit('SET_TOKEN', data.token);
        commit('SET_NAME', data.user.userName);
        commit('SET_AVATAR', data.user.avatar)
        commit('SET_UserId', data.user.userId)
        commit('SET_UnReadMessage', data.user.unReadMessage)
        commit('SET_IsAdmin', data.user.isAdmin)

        setToken(data.token)
        setUserId(data.user.userId)
        setUserName(data.user.userName)
        setUserAvatar(data.user.avatar)
        setUnReadMessage(data.user.unReadMessage)
        setIsAdmin(data.user.isAdmin)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  loginout({ commit }, userId) {
    return new Promise((resolve, reject) => {
      loginout(userId).then(response => {
        commit('SET_TOKEN', null);
        commit('SET_NAME', null);
        commit('SET_UserId', null);
        commit('SET_AVATAR', null)
        commit('SET_UnReadMessage', null)
        commit('SET_IsAdmin', null)
        removeToken(null)
        removeUserId(null)
        removeUserName(null)
        removeUserAvatar(null)
        removeIsAdmin(null)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, userInfo) {
    const { userName, password, nickname, email } = userInfo
    return new Promise((resolve, reject) => {
      register(userName, password, email, nickname).then(response => {
        const { data } = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      findSiteUser(state.user.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, userName, avatar, introduction, unReadMessage } = data

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        commit('SET_UnReadMessage', unReadMessage)
        setUserName(userName)
        setUserAvatar(avatar)
        setUnReadMessage(unReadMessage)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
// const store = () => new Vuex.Store({
//   state: {
//     user: {
//       token: getToken(),
//       avatar: getUserAvatar(),
//       name: getUserName(),
//       userId: getUserId(),
//       unReadMessage: getUnReadMessage()
//     }
//   },
//   getters: {
//     getToken(state) {
//       console.log(state)
//       return state.user.token
//     },
//     getAvatar(state) {
//       return state.user.avatar
//     },
//     getName(state) {
//       return state.user.name
//     },
//     getUserId(state) {
//       return state.user.userId
//     },
//     getUserId(state) {
//       return state.user.userId
//     },
//     getUnReadMsg(state) {
//       return state.user.unReadMessage
//     }
//   },
//   mutations: {
//     SET_TOKEN: (state, token) => {
//       state.user.token = token
//     },
//     SET_NAME: (state, name) => {
//       state.user.name = name
//     },
//     SET_AVATAR: (state, avatar) => {
//       state.user.avatar = avatar
//     },
//     SET_UserId: (state, userId) => {
//       state.user.userId = userId
//     },
//     SET_UnReadMessage: (state, unReadMessage) => {
//       state.user.unReadMessage = unReadMessage
//     },
//   },
//   actions: {
//     login({ commit }, userInfo) {
//       const { userName, password } = userInfo
//       return new Promise((resolve, reject) => {
//         login(userName, password).then(response => {
//           let data = response.data
//           commit('SET_TOKEN', data.token);
//           commit('SET_NAME', data.user.userName);
//           commit('SET_AVATAR', data.user.avatar)
//           commit('SET_UserId', data.user.userId)
//           commit('SET_UnReadMessage', data.user.unReadMessage)

//           setToken(data.token)
//           setUserId(data.user.userId)
//           setUserName(data.user.userName)
//           setUserAvatar(data.user.avatar)
//           setUnReadMessage(data.user.unReadMessage)
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },
//     loginout({ commit }, userId) {
//       return new Promise((resolve, reject) => {
//         loginout(userId).then(response => {
//           commit('SET_TOKEN', null);
//           commit('SET_NAME', null);
//           commit('SET_UserId', null);
//           commit('SET_AVATAR', null)
//           commit('SET_UnReadMessage', null)
//           removeToken(null)
//           removeUserId(null)
//           removeUserName(null)
//           removeUserAvatar(null)
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },
//     register({ commit }, userInfo) {
//       const { userName, password, nickname, email } = userInfo
//       return new Promise((resolve, reject) => {
//         register(userName, password, email, nickname).then(response => {
//           const { data } = response
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },
//     getInfo({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         findSiteUser(state.user.token).then(response => {
//           const { data } = response

//           if (!data) {
//             reject('Verification failed, please Login again.')
//           }

//           const { roles, userName, avatar, introduction, unReadMessage } = data

//           // roles must be a non-empty array
//           // if (!roles || roles.length <= 0) {
//           //   reject('getInfo: roles must be a non-null array!')
//           // }
//           commit('SET_NAME', userName)
//           commit('SET_AVATAR', avatar)
//           commit('SET_UnReadMessage', unReadMessage)
//           setUserName(userName)
//           setUserAvatar(avatar)
//           setUnReadMessage(unReadMessage)
//           resolve(data)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },
//   },
// })
// export default store
