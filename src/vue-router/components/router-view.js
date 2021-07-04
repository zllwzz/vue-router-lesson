export default {
    functional: true,//函数式组件没有状态
    render(h,{parent,data}) {
        let route = parent.$route;

        let depth = 0;
        while(parent) {
            if(parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent
        }
        data.routerView = true

        let record = route.matched[depth]

        if(!record) {
            return h();
        }
        return h(record.component,data)
    }
}