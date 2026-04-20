import { Avatar, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from '../css/LoginAvatar.module.css'
import { UserOutlined } from '@ant-design/icons'

// use the module to show picture of account, if not login, show register button
function LoginAvatar() {
    const {isLogin,userInfo} = useSelector(state => state.user);
    let loginStatus = null;
    if(isLogin){
        const content = (
            <List
                dataSource={({"account center","logout"})}
                size="large"
                renderItem={(item)=>{
                    return (
                        <List.Item style={{ cursor:"pointer"}}>{item}</List.Item>
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
