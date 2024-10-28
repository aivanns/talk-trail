import { Outlet } from "react-router-dom"
import logo from "../../assets/logo.svg"

const AuthPage = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-main-2">
                <div className="bg-main-1 px-12 py-6 rounded-lg shadow-lg w-[40rem] overflow-auto">
                    <div className="flex items-center justify-center">
                        <h1 className="text-7xl font-bold text-center text-main-4">TalkTrail</h1>
                        <img src={logo} alt="" className='w-20 h-20 ml-2'/>
                    </div>
                <div className="bg-main-2 p-4 rounded-lg my-5">
                        <Outlet />
                </div>
                </div>
            </div>
        </>
    )
}

export default AuthPage