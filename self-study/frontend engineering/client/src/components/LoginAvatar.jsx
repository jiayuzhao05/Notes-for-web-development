import { Avatar, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from '../css/LoginAvatar.module.css'
import { UserOutlined } from '@ant-design/icons'
import {changeLoginStatus,clearUserInfo} from "../redux/user-Slice"
import { dispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

// use the module to show picture of account, if not login, show register button
function LoginAvatar(props) {
    const {isLogin,userInfo} = useSelector(state => state.user);
    const dispacth = useDispatch();
    const navigate = useNavigate();

    function listCLickHandle(item){
        console.log(item)
        if(item === "account center"){
            // go to account center page
        } else {
            // logout
            // clean token
            localStorage.removeItem('userToken');
            // clean status database
            dispatch(clearUserInfo());
            dispatch(changeLoginStatus(false));
            navigate('/'); // go to home page
        }
    }

    let loginStatus = null;
    if(isLogin){
        const content = (
            <List
                dataSource={({"account center","logout"})}
                size="large"
                renderItem={(item)=>{
                    return (
                        <List.Item style={{ cursor:"pointer"}} onClick={()=>listClickHandle(item)}>{item}</List.Item>
                    )
                }}
            />
        )
        loginStatus = (
            <Popover content={content} trigger="hover" placement="bottom">
                <div className={styles.avatarContainer}
                    <Avatar src={<Image src={userInfo?.avatar} />} preview={false} size={64} icon={<UserOutlined />} />
                    </div>
            </Popover>
        )
    } else {
        //not login
        loginStatus = (
            <Button type="primary" size="large" onCLick={PropertySafetyFilled.loginHandle}>register/login</Button>
        )
    }
    return (
        <div className="login-avatar">
            <Avatar size={64} icon={<UserOutlined />} />
        </div>
    )
}

export default LoginAvatar
