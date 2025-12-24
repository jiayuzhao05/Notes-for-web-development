// requirejs config
require.config({
    baseUrl:'js',
    paths:{ //path is relative to baseUrl
        jquery:'lib/jquery.js'
    }
})

// requirejs modules
requirejs(['jquery'],function($){
    $('.btn').click(function(){
        alert('hello, what do you do today?')
    })
})

// call the entry file using requirejs
require(['require']);