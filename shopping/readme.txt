src下目录结构说明：
1.pages（定义所有与路由有关的组件）

2.components（定义与路由无关的子组件或公共组件）

3.redux
（1）reducers：定义reducer函数，一个文件对应一个reducer
（2）store.js：合并所有自定义的reducer，持久化数据存储，创建store

4.router
（1）IndexRouter.js：配置路由等
（2）IsLogin.js：路由拦截，验证是否登录

5.util
 axios相关配置