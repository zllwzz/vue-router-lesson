export function createRoute(record,location) {
    let res = [];
    if (record) {
        while(record) {
            res.unshift(record);
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}
function runQueue(queue,iterator,callback) {
    function step(index) {
        if(index === queue.length) return callback();
        let hook = queue[index]
        iterator(hook,() => step(index + 1))
    }
    step(0)
}
class History {
    constructor(router) {
        this.router = router
        this.current = createRoute(null,{
            path: '/'
        })
        this.cb = undefined
    }
    transitionTo(location,callback) {
        let r = this.router.match(location)

        if(location == this.current.path && r.matched.length == this.current.matched.length) {
            return;
        }
        let queue = this.router.beforeEachs;
        const iterator = (hook,next) => {
            hook(this.current,r,next)
        }
        runQueue(queue,iterator,() => {
            this.updateRoute(r,callback)
        })
    }
    updateRoute(r,callback) {
        this.current = r
        this.cb && this.cb(r)
        callback && callback()
    }
    setupListener() {
        window.addEventListener('hashChange',() => {
            this.transitionTo(window.location.hash.slice(1))
        })
    }
    listener(cb) {
        this.cb = cb
    }
}

export default History