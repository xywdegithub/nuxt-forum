
import { getToken} from '@/utils/auth';

export default ({ app, store,redirect }) => {
    app.router.beforeEach((to, from, next) => {
        console.log(to)
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if(getToken()){ //判断本地是否存在access_token
                redirect();
            }else {
                redirect({
                name:'index'
             })
            }
           }
           else {
            next();
           }
           /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
           if(to.fullPath == "/login"){
            if(getToken()){
                redirect({
              path:from.fullPath
             });
            }else {
                redirect();
            }
           }
    })
  }