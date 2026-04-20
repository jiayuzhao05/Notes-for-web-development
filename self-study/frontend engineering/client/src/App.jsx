import { RouterProvider } from 'react-router-dom'
import router from './router'
import NavHeader from './components/NavHeader'
import PageFooter from './components/PageFooter'
import './index.css'
import {getInfo} from './api/user'
import { useState,useEffect } from 'react'
import {getUserById,getInfo} from './api/user'
import { changeLoginStatus,initUserInfo } from './redux/user-Slice'
import { useDispatch } from 'react-redux'
import { message } from 'antd'

function App() {

    const [isModelOpen, setIsModelOpen] = useState(false);
    const dispatch = useDispatch();
    //加载根组件 恢复用户登录状态
    useEffect(()=>{
        async function fetchData(){
            const result = await getInfo()
            if(result.data){
                //token valid
                // get account info responding to id, and save to status database
                const {data} = await getUserById(result.data._id)
                //save to status database
                dispatch(initUserInfo(data))
                dispatch(changeLoginStatus(true))
            } else {
                //token expires
                message.warning(result.msg,'token expires')
            }
        }
        if(localStorage.getItem('userToken')){
            fetchData()
        }
    },[])
    return (
        <div className="app">
            <NavHeader />
            <RouterProvider router={router} />
            {/* router page */}
            <Content className="content">
                <routerConfig />
            </Content>
            {/* footer */}
            <Footer className="footer">
            <PageFooter />
            </Footer>
            {/* login form */}
            <LoginForm isShow={isModelOpen} closeModel={closeModel} />
        </div>
    )
}

export default App
