const nickNameValidator = new FieldValidator('txtNickName',async function(val)){
    if(!val){
        return 'please input nickname'
    }
})

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
})