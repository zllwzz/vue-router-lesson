import createRouteMap from './create-route-map'
import {createRoute} from './history/base'
export default function createMatcher(routes) {
    // 将数据扁平化处理
    // pathList [/, /about,/home]
    // pathMap {/:home,/about:about,/about/a:aboutA}
    let {pathList,pathMap} = createRouteMap(routes)

    function addRoutes(routes) {
        createRouteMap(routes,pathList,pathMap)
    }
    function match(location) {
        let record = pathMap[location];
        return createRoute(record,{
            path: location
        })
    }


    return {
        addRoutes,
        match
    }
}