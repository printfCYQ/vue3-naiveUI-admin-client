import http from '@/api/request'
import type * as T from './types'

const loginApi: T.ILoginApi = {
    login(params) {
        return http.post('/login', params)
    }

}
export default loginApi