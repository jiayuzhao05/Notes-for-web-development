import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'

const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/home" /> },
    { path: '/login', element: <Login /> },
    { path: '/home', element: <Home /> },
])

export default router
