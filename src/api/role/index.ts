import http from '@/api/request'
import type * as T from './types'

const roleApi: T.IRoleApi = {
    roles(params) {
        return http.get('/roles',params)
    },
    create(params){
        return http.post('/role/create', params)
    },
    update(params){
        return http.post('/role/update', params)
    },
    remove(params){
        return http.post('/role/del', params)
    },
}
export default roleApi