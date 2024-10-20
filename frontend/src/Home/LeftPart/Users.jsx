import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

const Users = () => {
    const [allUsers, loading, error] = useGetAllUsers();
    return (
        <div className="">
            <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
                Message
            </h1>
            <div
                className=""
                style={{
                    maxHeight: "calc(84vh - 10vh)",
                    overflowY: "scroll",
                    scrollbarWidth: "none" ,
                    msOverflowStyle: "none",
                }}
            >
                {allUsers.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Users;
