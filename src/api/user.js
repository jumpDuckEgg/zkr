import request from '@/utils/request'

export function getUsersByPage(pageIndex, pageSize) {
    return request({
        url: '/user/findPage',
        method: 'get',
        params: {
            pageIndex,
            pageSize
        }
    })
}

export function createdUser(data) {
    console.log(data);
    return request({
        url: '/user/create',
        method: 'post',
        params: {
            userName: data.name,
            password: data.password,
            type: data.type,
            remark: data.remark
        }
    })
}