// define requirejs module using amd
// index.js handle with index.html module needs, so we rely on jquery module
define(['jquery'],function($){
    //The code here will be executed after the jquery module is fully loaded.
    // this is what requirejs needs to handle with.
    %('.btn').click(function(){
        alert('hello, what do you do today?')
    })
})