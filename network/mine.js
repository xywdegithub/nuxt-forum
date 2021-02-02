import {request} from './request'

export function selectFeaturedPosts(data){ //获取精选文章列表
    return request({
       url:'/website/post/selectFeaturedPosts',
        params:data
    })
}
export function selectCollectPosts(data){  //获取帖子收藏列表
    return request({
        url:'/website/post/selectCollectPosts',
        params:data
    })
}
export function selectAdvertisements(data){  //广告位列表
    return request({
        url:'/website/advertisement/selectAdvertisements',
        params:data
    })
}
export function addAdvertisements(data){  //广告位列表
    return request({
        url:'/website/advertisement/add',
        params:data
    })
}
export function updateAdvertisements(data){  //广告位列表
    return request({
        url:'/website/advertisement/update',
        params:data
    })
}
export function deleteAdvertisements(data){  //广告位列表
    return request({
        url:'/website/advertisement/delete',
        params:data
    })
}
export function selectMessageTypeList(data){  //28	获取消息类型
    return request({
        url:'/website/message/selectMessageTypeList',
        params:data
    })
}
export function selectMessages(data){  //29	获取消息列表
    return request({
        url:'/website/message/selectMessages',
        params:data
    })
}
export function selectOneMessage(data){  //29	获取消息列表
    return request({
        url:'/website/message/selectOneMessage',
        params:data
    })
}
export function selectMyPosts(data){  //我发布的帖子
    return request({
        url:'/website/post/selectMyPosts',
        params:data
    })
}
export function selectUserCount(data){  //我发布的帖子
    return request({
        url:'/website/user/selectUserCount',
        params:data
    })
}
