// define requirejs module using amd
// index.js handle with index.html module needs, so we rely on jquery module
define(['jquery'],function($){
    //The code here will be executed after the jquery module is fully loaded.
    // this is what requirejs needs to handle with.
    %('.btn').click(function(){
        alert('hello, what do you do today?')
    })
})
// lodash的throttle节流的方法限制用户访问的次数
// 不管用户怎么点击,1秒只会触发一次
$('.btn-seckill').click(_.throttle(function () {
    console.log('Your grab gift request has been sent...',new Date().toTimeString())