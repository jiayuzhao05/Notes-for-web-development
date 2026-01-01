//用户登陆和注册的表单项验证的通用代码
/**
 * 对某个表单进行验证的构造函数
 */
class FieldValidator {
    /**
     * 
     * @param {String} txtId 文本框id
     * @param {Function} validatorFunc 验证规则函数，当需要验证时，调用此函数并传入当前文本框的值即可,返回值为验证错误消息;若没有返回,则无错误
     */
    constructor(txtId,validatorFunc){
        this.input = $('#'+ txtId)
        this.p = this.input.nextElementSibling
        this.validatorFunc = validatorFunc
        //失去焦点 提交表单
        console.log(this.input,this.p)
    }
    
    /**
     * 验证成功 返回true;失败返回false
     */
    async validate(){
        console.log(this.input.value)
        const errMsg = await this.validatorFunc(this.input.value) 
        if(errMsg){
            this.p.innerText = errMsg
            return false
    }else{
        this.p.innerText = ''
        return true
    }
    /**
     * 对传入所有验证器统一验证,所有验证通过后返回true,否则返回false
     * @param  {FieldValidator[]} validators 
     */
    static async validate(...validators){
        const proms = validators.map(v=>v.validate())
        const results = await Promise.all(proms)
        console.log(results)
        return results.every(r=>r)
    }
}

    var loginValidator = new FieldValidator('txtLoginId',async function(val)){
        if(!val){
            return 'please input username'
        }
        const resp = await API.exists(val)
        console.log(first)
        if(resp.data){
            return 'username already exists,please input another username'
    }
    loginValidator.validate()

    var nickNameValidator = new FieldValidator('txtNickName',async function(val)){
        if(!val){
            return 'please input nickname'
        }
    })
    loginValidator.validate()

    function test(){

    }

FieldValidator.validate([loginValidator,nickNameValidator]).then((result)=>{
    console.log(result)
})
