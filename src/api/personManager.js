import request from '@/utils/request'

export function getPersonManagers(pageIndex,pageSize) {
    return request({
        url: '/personnel/findPage',
        method: 'get',
        params: {
            pageIndex,
            pageSize
        }
    })
}

export function addPerson(data) {
    return request({
        url: '/personnel/create',
        method: 'post',
        data: data
    })
}

export function modifyPerson(data){
    return request({
        url:'/personnel/update',
        method:'put',
        data:data
    })
}

export function deletePerson(deletArray){
    return request({
        url:'/personnel/delete',
        method:'delete',
        data:deletArray
    })
}