import {request} from './request'

export function findCategoryTree(){  //帖子类型
    return request({
        url:'/website/category/findCategoryTree',
    })
}
export function selectPosts(data){  //所有帖子
    return request({
       url:'/website/post/selectPosts',
        params:data
    })
}

export function findCategory(data  ){  //获取当前帖子类型信息
    return request({
        url:'/website/category/findCategory',
        params:data
    })
}
export function findPost( data ){//10	查看单个帖子信息
    return request({
        url:'/website/post/findPost',
        params:data
    })
}
export function releasePost( data){//	发布帖子
    return request({
        url:'/website/post/release',
        params:data
    })
}
export function selectPostComment( data ){//	查看帖子评论
    return request({
        url:'/website/postComment/selectPostComment',
        params:data
    })
}
export function reportAdd( data ){//	26	帖子举报
    return request({
        url:'website/postReport/reportAdd',
        params:data
    })
}
export function selectPostReportTypeList(data){  //获取帖子举报类型
    return request({
        url:'website/postReport/selectPostReportTypeList',
        params:data
    })
}
export function replyComment( data ){//	回复
    return request({
        url:'/website/postComment/release',
        params:data
    })
}

export function likePost( data ){//	点赞
    return request({
        url:'/website/post/likePost',
        params:data
    })
}

export function dislikePost( data ){//	踩
    return request({
        url:'/website/post/dislikePost',
        params:data
    })
}

export function faviorPost( data ){//	帖子收藏
    return request({
        url:'/website/post/faviorPost',
        params:data
    })
}

export function cancelfaviorPost( data ){//	帖子取消收藏
    return request({
        url:'/website/post/cancelfaviorPost',
        params:data
    })
}

export function moderatorApply( data ){//	版主申请
    return request({
        url:'/website/category/moderatorApply',
        params:data
    })
}

export function moderatorInfo( data ){//版主信息
    return request({
        url:'/website/category/moderatorInfo',
        params:data
    })
}
export function selectSiteAnnotation( data ){//网站公告
    return request({
        url:'/website/config/selectSiteAnnotation',
        params:data
    })
}
export function selectSiteStatic( data ){//网站公告
    return request({
        url:'/website/config/selectSiteStatic',
        params:data
    })
}
export function selectAdvertisementList( data ){
    return request({
        url:'/website/advertisement/selectAdvertisementList',
        params:data
    })
}

export function selectRecommendPosts( data ){
    return request({
        url:'/website/post/selectRecommendPosts',
        params:data
    })
}
export function likePostComment( data ){
    return request({
        url:'/website/postComment/likePostComment',
        params:data
    })
}
export function dislikePostComment( data ){
    return request({
        url:'/website/postComment/dislikePostComment',
        params:data
    })
}
export function findOne( data ){
    return request({
        url:'/website/advertisement/findOne',
        params:data
    })
}
export function findFeaturedCategory( data ){
    return request({
        url:'/website/category/findFeaturedCategory',
        params:data
    })
}
export function deleteByPost( data ){
    return request({
        url:'/website/post/deleteByPost',
        params:data
    })
}
export function updatePost( data ){
    return request({
        url:'/website/post/updatePost',
        params:data
    })
}

export function updateComment(data){  
    return request({
        url:'/website/postComment/updateComment',
        params:data
    })
}
export function deleteComment(data){  
    return request({
        url:'/website/postComment/deleteComment',
        params:data
    })
}
export function selectSecondPostComment(data){  
    return request({
        url:'/website/postComment/selectSecondPostComment',
        params:data
    })
}

