import request from '@/utils/request'

export function getContracts(data) {
    return request({
        url: '/contract/findPage',
        method: 'get',
        params: data
    })
}

export function addContract(data) {
    return request({
        url: '/contract/create',
        method: 'post',
        data: data
    })
}

export function updateContract(data) {
    return request({
        url: '/contract/update',
        method: 'put',
        data: data
    })
}

export function removeContract(deletArray) {
    return request({
        url: '/contract/delete',
        method: 'delete',
        data: deletArray
    })
}