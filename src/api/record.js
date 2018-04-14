import request from '@/utils/request'

export function getRecords(data) {
    return request({
        url: '/record/findPage',
        method: 'get',
        params: data
    })
}

export function createRecord(data) {
    return request({
        url: '/record/create',
        method: 'post',
        data: data
    })
}

export function updateRecord(data) {
    return request({
        url: '/record/update',
        method: 'put',
        data: data
    })
}
export function deleteRecord(deletArray) {
    return request({
        url: '/record/delete',
        method: 'delete',
        data: deletArray
    })
}