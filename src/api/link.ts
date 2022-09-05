import service from "../utils/service"
// 封装相关的数据请求

let link=(url:any,method="get",data:any,params:any)=>{
    return new Promise((resolve,reject)=>{
        service.request({
            url,
            method,
            data,
            params
        }).then((ok)=>{
            resolve(ok)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export default link