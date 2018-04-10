import request from '@/utils/request'

export function getPersonManagers() {
    return request({
        url: '/personnel/findPage',
        method: 'get',
        params: {
            pageIndex,
            pageSize
        }
    })
}