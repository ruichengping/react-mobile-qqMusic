import axios from 'axios';
import {Toast} from 'antd-mobile';
const instance=axios.create({
  //超时时间
  timeout:3000,
  //响应前处理
  transformResponse:(responseData)=>{
    const {success,message} = JSON.parse(responseData);
    if(!success) Toast.fail(message);
    return responseData;
  }
})
//响应拦截
instance.interceptors.response.use(function (response) {
  const {status,data,statusText}=response;
  if(status===200){
    return JSON.parse(response.data);  
  }else if(status===401){
    //跳转登录
  }else{
    Toast.fail(`${status}-${statusText}`);
    return response;  
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default {
  get:(url,params,option)=>{
    return instance.get(url,Object.assign({
      params
    },option));
  },
  post:(url,params,option)=>{
    return instance.post(url,params,option); 
  },
  delete:(url,params,option)=>{
    return instance.delete(url,Object.assign({
      params
    },option));
  }
}