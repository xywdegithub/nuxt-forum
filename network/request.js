import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

export function request(config) {
    const instance1 = axios.create({
      //  baseURL: 'http://2t3j516051.51vip.biz',
        baseURL:  'http://47.111.178.85:9090',
        method:'POST',
        timeout: 20000
    })
    instance1.interceptors.request.use(config => {
        const token = getToken();
        if (token) {
            config.headers.Authentication = token;
          }
        return config
    }, err => {
        return Promise.reject(err)
    })
    instance1.interceptors.response.use(
      res => {
        const data = res.data;
        // if the custom code is not 20000, it is judged as an error.
        if ( data.code && data.code != 200) {
          Message({
            message: data.message || 'Error',
            type: 'error',
            duration: 3 * 1000
          })
    
          if ( data.code &&  data.code === 514) {
            // to re-login
            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
              confirmButtonText: 'Re-Login',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              console.log("guoqi")
              // store.dispatch('user/resetToken').then(() => {
              //   location.reload()
              // })
            })
          }
          return Promise.reject()
        } else {
         return data
        }
      },
      error => {
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(error)
      }
    )
    
    return instance1(config)
}