import request from '@/utils/request'

export function getAchievements(data) {
    return request({
        url: '/achievement/findPage',
        method: 'get',
        params: data
    })
}

export function addAchievement(data) {
    return request({
        url: '/achievement/create',
        method: 'post',
        data: data
    })
}

export function updateAchievement(data) {
    return request({
        url: '/achievement/update',
        method: 'put',
        data: data
    })
}

export function removeAchievement(deletArray) {
    return request({
        url: '/achievement/delete',
        method: 'delete',
        data: deletArray
    })
}