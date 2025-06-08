import { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Login as PerformLogin } from "../../services/authServices";
import { AuthenticatedContext } from "../../shared/Authenticated";
import { IsOfficer } from "../../utils/roleHelper";

const Login = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthenticatedContext);
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChange_Username = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handleChange_Password = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    async function HandleLogin(){
        const user = await PerformLogin({
            username: userName,
            password: password,
        })
 
        if(user.id > 0){
            const id = user.id
            auth?.setUser(user)
            if(IsOfficer(user)){
                navigate(`/pages/home`);
            }
            else{
                navigate(`/pages/users/${id}/details`);
            }
        }
        else{
            
            alert("Wrong username or password!")
        }
    }

    return(
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
            <a href="#" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
            <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo"/>
                <span>Simple KYC Authentication</span>
            </a>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                <form className="mt-8 space-y-6" action="#">
                    <div>
                        <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input value={userName} onChange={handleChange_Username} name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="username" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input value={password} onChange={handleChange_Password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required/>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Remember me</label>
                        </div>
                        <Link to='/pages/auth/reset-password' className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost Password?</Link>
                    </div>
                    <button onClick={HandleLogin} type="button" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Forgot password? <Link to='/auth/sign-up' className="text-primary-700 hover:underline dark:text-primary-500">Sign-up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;