'use strict';
const hasha = require('hasha');


 class PortalApis{

        

        constructor(config){
            this.config = config;
        }

        sign() {
            const{appid, appsecret} = this.config;
           // var appid = "roco";//定义变量为字符串
            //var appSercer= "123456789";//定义变量为字符串
            const timestamp = Math.round(new Date().getTime());//获取时间戳（毫秒），如要获取秒得/1000
            const hash = hasha(timestamp + appid + appSercer).toString().toUpperCase();//将时间戳+appid+appSercer进行MD5哈希并转换为大写
            const signs = appid +"_"+ timestamp +"_"+ hash;//定义变量

            return signs;
        }
    }

module.exports = PortalApis