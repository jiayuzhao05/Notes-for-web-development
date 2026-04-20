import request from './request'

export const login = (data) => request.post('/user/login', data)

export const register = (data) => request.post('/user/register', data)

export const getUserInfo = () => request.get('/user/info')

export const checkLoginIdExist = (loginId) =>
    request.get('/user/check', { params: { loginId } })


export function userIsexist(loginId){
    return request({
        url:'/user/check/${loginId}',
        method:'GET'
    })
}

/**
 * user registration
 */
export function addUser(newUserInfo){
    return request({
        url:'/api/user',
        data:newUserInfo,
        method:'POST'
    })
}


/**
 * user login
 */
export function userLogin(loginInfo){
    return request({
        url:'/user/login',
        data:loginInfo,
        method:'POST'
    })
}

/**
 * search user through id
 */
export function getUserById(Id){
    return request({
        url:'/user/info/${Id}',
        method:'GET'
    })}


/**
 * recover account login status
 */
export function recoverLoginStatus(){
    return request({
        url:'/user/recover',
        method:'GET'
    })}


