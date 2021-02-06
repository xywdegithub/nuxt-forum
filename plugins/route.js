
import { getToken} from '@/utils/auth';

export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
        console.log(to)
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if(getToken()){ //判断本地是否存在access_token
             next();
            }else {
             next({
                name:'index-categoryId'
             })
            }
           }
           else {
            next();
           }
           /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
           if(to.fullPath == "/login"){
            if(getToken()){
             next({
              path:from.fullPath
             });
            }else {
             next();
            }
           }
    })
  }