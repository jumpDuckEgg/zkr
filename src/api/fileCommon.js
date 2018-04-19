import request from '@/utils/request'

export function getFileCommon(data) {
    return request({
        url: '/file_common/findPage',
        method: 'get',
        params: data
    })
}

export function addFileCommon(data) {
    return request({
        url: '/file_common/create',
        method: 'post',
        data: data
    })
}

export function updateFileCommon(data) {
    return request({
        url: '/file_common/update',
        method: 'put',
        data: data
    })
}

export function removeFileCommon(deletArray) {
    return request({
        url: '/file_common/delete',
        method: 'delete',
        data: deletArray
    })
}