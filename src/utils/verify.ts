export function CheckEmail(data:any){
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; 
    return !reg.test(data)?true:false
}
export function CheckPassword(data:any){
    //必须包含大小写字母和数字的组合,不能使用特殊字符,长度在8-10之间
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
    return !reg.test(data)?true:false
}