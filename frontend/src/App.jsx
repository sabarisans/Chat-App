import { Navigate, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/Signup/SignUp";
import { useAuth } from "./context/AuthProvider";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import { Toaster } from "react-hot-toast";

function App() {
    const [authUser, setAuthUser] = useAuth();
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        authUser ? (
                            // <div className="flex h-screen">
                            //     <Left />
                            //     <Right />
                            // </div>
                            <div className="drawer lg:drawer-open">
                                <input
                                    id="my-drawer-2"
                                    type="checkbox"
                                    className="drawer-toggle"
                                />
                                <div className="drawer-content flex flex-col items-center justify-center">
                                    <Right />
                                </div>
                                <div className="drawer-side">
                                    <label
                                        htmlFor="my-drawer-2"
                                        aria-label="close sidebar"
                                        className="drawer-overlay"
                                    ></label>
                                    <ul className="menu bg-base-200 text-base-content min-h-full p-0">
                                        <Left />   
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={authUser ? <Navigate to="/" /> : <LogIn />}
                />
                <Route
                    path="/signup"
                    element={authUser ? <Navigate to="/" /> : <SignUp />}
                />
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
