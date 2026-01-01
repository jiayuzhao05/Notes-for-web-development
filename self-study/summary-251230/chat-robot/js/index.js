
(async function(){
    //验证是否有登陆 如果没有登陆 跳转到登录页面 如果有登陆 获取到用户登陆信息
    const resp = await API.profile()
    console.log(resp)
    const.user = resp.data 

    // if(resp.code === 0){
    //     //目前是登陆状态
    //     const user = resp.data
    //     console.log(user)
    // }
    // else{
    //     //目前是未登陆状态
    //     alert('please login')
    //     location.href = './login.html'
    //     return
    // }

    if(!user){
        alert('please login')
        location.href = './login.html'
        return
    }

    const doms = {
        aside:{
            nickname: $('#nickname'),
            loginId: $('#loginId'),
        }
    }

    //下面代码能执行 一定是登陆状态
    //设置用户信息
    function setUserInfo(){
        doms.aside.nickname.innerText = user.nickname
        doms.aside.loginId.innerText = user.loginId
    }

    function addChat(chatInfo){
        const div = $$$('div')
        div.classList.add('chat-item')
        if(chatInfo.from){
            div.classList.add('me')
        }
        const img = $$$('img')
        img.className = 'avatar'
        img.src = chatInfo.from?
        './asset/robot.png'
        :''

    }

    addChat({
        from: 'robot',
        value: 'hello'
    })
})()

