import { useRef, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import styles from '../css/LoginForm.module.css'
import { getCaptcha, userIsExist, addUser, userLogin, getUserById } from '../api/user'
import { initUserInfo,changeLoginStatus } from '../redux/user-Slice'
import { useDispatch } from 'react-redux'

function LoginForm(props) {
    //register form status data
    const [registerInfo, setRegisterInfo] = useState({ loginId: '', name: '', loginPwd: '' })
    // login form status data
    const [loginInfo, setLoginInfo] = useState({
        loginId:"",
        loginPwd:"",
        captcha:"",
        remember:false
    })
    const [value,setValue] = useState(1);
    const loiginFormRef = useRef();
    const registerFormRef = useRef(null)
    const dispatch = useDispatch();


    const registerHandle = (values) => {
        console.log('register submit:', values)
    }

    const updateInfo = (info, value, key, setter) => {
        setter({ ...info, [key]: value })
    }

    async function captchaClickHandle(){
        const result = await getCaptcha();
        setCaptcha(result);
    }

    async function loginHandle(){
        console.log("loginhandle", loginInfo);
        const result = await userLogin(loginInfo);
        if(result.data){ 
            //verification code correct
            //(1) pass wrong （2）account frozen （3）account login successfully
            const data = result.data;
            if(!data.data){
                message.error("password wrong")
                captchaClickHandle();
            } else if(!data.data.enabled){
                message.warning("account frozen")
                captchaClickHandle();
            } else {
                //login successfully
                //save token
                localStorage.userToken = data.token;
                //save user info into status database
                const result = await getUserById(data.data._id);
                dispatch(initUserInfo(result.data));
                dispatch(changeLoginStatus(true))
                handleCancel();
            }
        } else {
            messgae.warning(result.msg);
            captchaClickHandle();
        }
    }

    function handleCancel(){
        //clean the form input
        setRegisterInfo({loginId: '', name: '', loginPwd: ''})
        setLoginInfo({
            loginId:"",
            loginPwd:"",
            captcha:"",
            remember:false})
        props.closeModel();
    }

    async function registerHandle(){
        const result = await addUser(registerInfo);
        console.log(result);
        if(result.data){
            message.success("registration successfully,default pass is 123456");
            // save user info to database
            dispatch(initUserInfo(result.data));
            //update login status
            dispatch(changeLoginStatus(true));
            //close register form
            handleCancel();
        } else {
            message.warning(result.msg);
            CaptchaClickHandle();
        }
    }
    

    /*
    * verify if account exits
    */
    async function checkLoginIdExist(){
        if(resgisterInfo.loginId) {
            const {data} = await userIsexist()
        if(data){
            return Promise.reject('account already exists')
        }
        }
    }

    return (
        // register form JSX
        container = (
        <div className={styles.container}>
            <Form
                name="basic2"
                autoComplete="off"
                ref={registerFormRef}
                onFinish={registerHandle}
            >
                <Form.Item
                    label="login account"
                    name="loginId"
                    rules={[
                        {
                            required: true,
                            message: 'plz input account, this is required',
                        },
                    ]}
                    validateTrigger="onBlur"
                >
                    <Input
                        placeholder="plz input account"
                        value={registerInfo.loginId}
                        onChange={(e) =>
                            updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)
                        }
                    />
                </Form.Item>

                <Form.Item label="姓名" name="name">
                    <Input
                        placeholder="请输入姓名"
                        value={registerInfo.name}
                        onChange={(e) =>
                            updateInfo(registerInfo, e.target.value, 'name', setRegisterInfo)
                        }
                    />
                </Form.Item>

                <Form.Item label="密码" name="loginPwd">
                    <Input.Password
                        placeholder="请输入密码"
                        value={registerInfo.loginPwd}
                        onChange={(e) =>
                            updateInfo(registerInfo, e.target.value, 'loginPwd', setRegisterInfo)
                        }
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    ))
}

export default LoginForm
