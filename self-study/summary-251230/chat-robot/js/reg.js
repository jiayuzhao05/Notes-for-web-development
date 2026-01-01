const loginIdValidator = new FieldValidator('txtNickId',async function(val)){
    if(!val){
        return 'please input nickname'
    }
}


const nickNameValidator = new FieldValidator('txtNickName',async function(val)){
    if(!val){
        return 'please input nickname'
    }
}

const loginValidator = new FieldValidator('txtLoginPwd',async function(val)){
    if(!val){
        return 'please input password'
    }
}

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',async function(val)){
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
    const data =
        {
            loginId: loginIdValidator.input.value,
            nickname: nicknameValidator.input.value,
            loginPwd: loginPwdValidator.input.value,
            loginPwdConfirm: loginPwdConfirmValidator.input.value,
        }
    // const data = Object.fromEntries(formData.entries())
    console.log(data)
    const resp = await API.reg(data)
    if(resp.code === 0){
        alert('registration successfully')
        location.href = './login.html'
    }else{
        alert(resp.message)
    }
}