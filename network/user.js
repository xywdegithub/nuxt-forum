import {request} from './request'

export function register(userName ,password ,email,nickname ){
    return request({
        url:'/website/user/register',
        params:{
            userName,
            password,
            email,
            nickname
        }
    })
}
export function login(userName ,password ){
    return request({
       url:'/website/user/login',
        params:{
            userName ,
            password 
        }
    })
}
export function loginout(userId ){
    return request({
       url:'/website/user/logout',
        params:{
            userId
        }
    })
}
export function changePassword(userName ,newPassword ,oldPassword  ){
    return request({
        url:'/website/user/changePassword',
        params:{
            userName ,
            newPassword ,  
            oldPassword 
        }
    })
}
export function findSiteUser(userId ){
    return request({
        url:'/website/user/findSiteUser',
        params:{
            userId 
        }
    })
}
export function updateSiteUser(data){
    return request({
        url:'/website/user/updateSiteUser',
        params:data
    })
}