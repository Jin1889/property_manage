import {ref} from 'vue'
const md5 = require("js-md5")

export default function(data:any){
    let md5Data = ref(md5(data))
    return md5Data
}