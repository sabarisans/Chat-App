import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { LOCAL_CONSTANT } from "../../constant/LocalConstant";
import toast from "react-hot-toast";

const SignUp = () => {
    const [authUser, setAuthUser] = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    const validatePassword = (value) => {
        return value === password || "Password not match";
    };

    const onSubmit = async (data) => {
        const userInfo = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        };
        await axios
            .post("/user/signup", userInfo)
            .then((res) => {
                localStorage.setItem(
                    LOCAL_CONSTANT.USER,
                    JSON.stringify(res.data)
                );
                setAuthUser(res.data);
                toast.success("Created successfully");
            })
            .catch((e) => {
                console.error(e);
                toast.error(e.message);
            });
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form
                className="border shadow-slate-700 shadow-lg border-white rounded-lg  p-4 w-96"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-center my-1 font-semibold text-2xl">
                    Chat
                </h1>
                <h3 className="text-white text-xl font-semibold">Sign Up</h3>
                <div className="my-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <FaUser />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Username"
                            {...register("fullName", { required: true })}
                        />
                    </label>
                    {errors.fullName && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="my-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <IoMdMail />
                        <input
                            type="email"
                            className="grow"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                    </label>
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="my-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <FaLock />
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                    </label>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="my-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <FaLock />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="grow"
                            {...register("confirmPassword", {
                                required: true,
                                validate: validatePassword,
                            })}
                        />
                    </label>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <div className="my-3">
                    <p>
                        Have an account?{" "}
                        <Link to={"/login"}>
                            <span className="text-white cursor-pointer hover:text-slate-300 duration-300">
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
                <div className="my-3 flex justify-center">
                    <button className="hover:bg-slate-300 duration-300 bg-slate-400 text-black rounded-md font-semibold px-3 py-1">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
