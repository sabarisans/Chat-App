import  { useEffect, useState } from "react";
import axios from "axios";

const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await axios.get("/user/all-users");
                setAllUsers(data.users);
            } catch (error) {
                console.error("Error in useGetAllUsers:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return [allUsers, loading, error];
};

export default useGetAllUsers;
