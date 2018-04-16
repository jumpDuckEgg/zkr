import request from '@/utils/request'

export function getBiddings(data) {
    return request({
        url: '/bidding/findPage',
        method: 'get',
        params: data
    })
}

export function addBidding(data) {
    return request({
        url: '/bidding/create',
        method: 'post',
        data: data
    })
}

export function updateBidding(data) {
    return request({
        url: '/bidding/update',
        method: 'put',
        data: data
    })
}

export function removeBidding(deletArray) {
    return request({
        url: '/bidding/delete',
        method: 'delete',
        data: deletArray
    })
}