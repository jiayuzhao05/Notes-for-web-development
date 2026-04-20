import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:'user',
    initialState:{
        isLogin:false,
        userInfo:{},
    },
    reducers:{
        //initialize user info
        initUserInfo:(state,{payload})=>{
            state.userInfo = payload;
        }
        // change login status
        changeLoginStatus: (state,{payload})=>{
            state.isLogin = payload;
        }
        //delete user info
        clearUserInfo:(state)=>{
            state.userInfo = {};
    }
}
})

const {initUserInfo,changeLoginStatus,clearUserInfo} = userSlice.actions;
export default userSlice.reducer;

