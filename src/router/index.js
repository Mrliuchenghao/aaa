import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginA.vue'
import Home from '../components/HomeA.vue'
import Weclome from '../components/WeclomeA.vue'
import UserList from '../components/admin/UserList.vue'
Vue.use(VueRouter)

const routes = [

  {
    path:"/",
    redirect:"/login"
    
  },
  {
    path:"/login",
    component:Login 
  },
  {
    path:"/home",
    component:Home,
    redirect:"/Weclome",
    children:[
      {path:"/Weclome",component: Weclome},
      {path:"/user",component: UserList}
    ]
  },
 
  
]

const router = new VueRouter({
  routes
})

const origubalPush =VueRouter.prototype.push;
VueRouter.prototype.push=function push(location,onResolve,onReject){
  if(onResolve||onReject) return origubalPush.call(this,location,onResolve,onReject)
  return origubalPush.call(this,location).catch(err=>err)
}

router.beforeEach((to,from,next)=>{
  //to将要访问，from 从哪访问，next继续访问to 的路径
  if(to.path=='/login') return next();

  const userFlag=window.sessionStorage.getItem("user");//取出用户
  if(!userFlag) return next('/login');//没有对应得值，返回登录页面
  next();//放行
})

export default router
