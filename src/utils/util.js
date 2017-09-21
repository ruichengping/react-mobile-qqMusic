(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.util = factory());
}(this, (function () {
     'use strict';
     return {
         //格式化数字位数
         "fix":function(num, length){
            return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
         },
         //根据秒转换成分:秒的形式
         "formatSeconds":function(seconds){
            var minute=Math.floor(seconds/60);
            var second=Math.round(seconds-minute*60);
            return this.fix(minute,2)+":"+this.fix(second,2);
         }
     }
})));