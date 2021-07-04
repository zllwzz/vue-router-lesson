import RouterView from './components/router-view'
// import RouterLink from './components/router-link'

const install = (Vue) => {
    Vue.mixin({
        beforeCreate() {
            // 判断是不是根
            if(this.$options.router) {
                // 保存根实例
                this._routerRoot = this;
                this._router = this.$options.router;

                // 路由的初始化
                this._router.init(this);
                // 将current属性定义成响应式的 这样稍后更新current 就可以刷新视图了
                Vue.util.defineReactive(this,'_route',this._router.history.current);
                // 每次更新路径之后 需要更新_route属性

            } else {
                // 子组件都有一个_routerRoot属性可以获取到最顶层的根实例
                this._routerRoot = this.$parent && this.$parent._routerRoot
                // 子组件获取router实例
                // this._routerRoot._router
            }
        },
    })

    // 实现一个代理
    Object.defineProperty(Vue.prototype,'$route',{
        get() {
            return this._routerRoot._route
        }
    })
    Object.defineProperty(Vue.prototype,'$router',{
        get() {
            return this._routerRoot._router
        }
    })

    // 注册组件
    Vue.component('router-view',RouterView)
    // Vue.component('router-link',RouterLink)
}

export default install;