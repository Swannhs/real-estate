import Login from "../pages/Login";
import Home from "../pages/Home";

const LoginRoutes = {
    path: '/',
    children: [
        {
            path: '',
            element: <Home/>
        },
        {
            path: 'login',
            element: <Login/>
        }
    ]
}

export default LoginRoutes;