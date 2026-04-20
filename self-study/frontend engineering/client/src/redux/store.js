import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: { info: null, token: '' },
    reducers: {
        setUser(state, action) {
            state.info = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        clearUser(state) {
            state.info = null
            state.token = ''
        },
    },
})

export const { setUser, setToken, clearUser } = userSlice.actions

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})

export default store
