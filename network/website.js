import {request} from './request'

export function allSiteConfig(data){
    return request({
        url:'/site/config/allSiteConfig',
        params:data
    })
}
export function selectOneSiteConfig(data){
    return request({
        url:'/site/config/selectOneSiteConfig',
        params:data
    })
}
