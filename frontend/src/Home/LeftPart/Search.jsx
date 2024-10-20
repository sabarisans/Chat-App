import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const Search = () => {
    const [search, setSearch] = useState("");
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;

        const lowercasedSearch = search.toLowerCase();

        const foundUser = allUsers.find((user) =>
            user.fullName.toLowerCase().includes(lowercasedSearch)
        );

        if (foundUser) {
            setSelectedConversation(foundUser);
        } else {
            toast.error("User not found");
        }

        setSearch("");
    };

    return (
        <div>
            <div className="px-6 py-5 ">
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-3">
                        <label className="input input-bordered flex items-center gap-2 w-[80%]">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>
                        <button type="submit">
                            <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Search;
