import History from './base'
function ensureSlash() {
    if(window.location.hash) {
        return;
    }
    window.location.hash = '/'
}


class HashHistory extends History {
    constructor(router) {
        super(router)
        this.router = router

        // 确保有/
        ensureSlash()
    }
    getCurrentLocation() {
        return window.location.hash.slice(1)
    }
}



export default HashHistory