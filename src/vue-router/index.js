import createMatcher from './createMatcher'
import HashHistory from './history/hash'


// 导出一个类，这个类上应该有一个install方法
import install from './install'
class VueRouter {
    constructor(options) {
        // matcher 匹配器 处理树形结构 扁平化

        // 默认先进行数据的格式化
        // 这里会返回两个方法 addRoutes match
        this.matcher = createMatcher(options.routes || []);

        // 有三种路由 history hash abstract
        this.history = new HashHistory(this)

        this.beforeEachs = []
    }
    match(location) {
        return this.matcher.match(location);
    }
    push(location) {
        this.history.transitionTo(location,() => {
            window.location.hash = location
        })
    }
    beforeEach(cb) {
        this.beforeEachs.push(cb)
    }
    init(app) {
        // app是最顶层的vue的实例
        // console.log(app)

        // 需要获取到路由的路径 进行跳转 匹配到对应的组件进行渲染
        // 当第一次匹配完成后，需要监听路由的变化 之后完成后续的更新操作

        const history = this.history;
        const setupHashListener = () => {
            history.setupListener()
        }
        history.transitionTo(history.getCurrentLocation(),setupHashListener)
        history.setupListener((route) => {
            app._route = route
        })
    }
}

VueRouter.install = install

export default VueRouter