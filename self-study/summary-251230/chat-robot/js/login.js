const loginIdValidator = new FieldValidator('txtLoginId',function(val)){
    if(!val){
        return 'please input account'
    }
}


const nickNameValidator = new FieldValidator('txtLoginPwd',function(val)){
    if(!val){
        return 'please input nickname'
    }
}

const loginValidator = new FieldValidator('txtLoginPwd',function(val)){
    if(!val){
        return 'please input password'
    }
}

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',function(val)){
    if(!val){
        return 'please input password'
    }
    if(val === loginValidator.input.value){
        return 'password is not the same'
    }
}

const form = $('.user-form')
form.onsubmit = async function(e){
    console.log('form is submitted')
    e.preventDefault()
    const result = await FieldValidator.validate(
        loginIdValidator,
        nicknameValidator,
        loginPwdValidator,
        loginPwdConfirmValidator
    )
    if(!result){
        return //验证失败
    }
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const resp = await API.reg(data)
    if(resp.code === 0){
        alert('registration successfully')
        location.href = './login.html'
    }else{
        alert(resp.message)
        loginIdValidator.p.innerText = ''
        loginIdValidator.input.value = ''
    }
}