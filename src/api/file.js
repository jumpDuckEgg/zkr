import request from '@/utils/request'

export function deleteFile(data){
    return request({
        url:'/file/delete',
        method:'delete',
        data:data 
    })
}