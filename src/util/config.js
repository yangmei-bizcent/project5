/*请求 基本信息配置*/
import Qs from 'qs'
function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for(var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if(num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}
var Request = new UrlSearch(); //实例化

if(!Request.ModelUrl || Request.ModelUrl == 'undefined'){
    //测试
    // const baseURL = document.location.protocol + '//192.168.0.241:9999/';
    // const baseURL = document.location.protocol + '//192.168.0.241:9994/';    
     // const baseURL = document.location.protocol + '//jthyapitest.zwjk.com/';
    //预生产
    var baseURL = document.location.protocol + "//yscjthyums.zwjk.com/";    
    //生产
    // var baseURL = document.location.protocol + "//jthy.zwjk.com/";
    // 河南
    // var baseURL = document.location.protocol + '//jthy.o2omed.com.cn/';
}else{
    var baseURL = Request.ModelUrl + '/';
}
const objBase = {
    //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
    url: '/get',
    // 请求方法同上
    method: 'get', // default
    // 基础url前缀
    baseURL: baseURL,
    // 请求头信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: [
        function(data) {
            // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
            data = Qs.stringify(data);
            return data;
        }
    ],
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    paramsSerializer: function(params) {
        return Qs.stringify(params)
    },
    //设置超时时间
    timeout: 5000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default
    //返回数据类型
    responseType: 'json' // default
}
const modelBase = {
    //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
    url: '/get',
    // 请求方法同上
    method: 'get', // default
    // 基础url前缀
    baseURL: baseURL,
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    //设置超时时间
    timeout: 5000,

    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default

    //返回数据类型
    responseType: 'json' // default
}
export {
    baseURL,
    objBase,
    modelBase
}