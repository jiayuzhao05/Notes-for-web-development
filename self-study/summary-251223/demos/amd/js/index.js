// define requirejs module using amd
// index.js handle with index.html module needs, so we rely on jquery module
// rely on lodash module
define(['jquery', 'lodash'],function($, _){
    //The code here will be executed after the jquery module is fully loaded.
    // this is what requirejs needs to handle with.
    $('.btn').click(function(){
        alert('hello, what do you do today?')
    })
})
// lodash's throttling method limits the number of user visits
// No matter how the user clicks, it will only be triggered once per second.
    $('.btn-seckill').click(_throttle(function () {
        console.log('Your grab gift request has been sent...',new Date().toTimeString())