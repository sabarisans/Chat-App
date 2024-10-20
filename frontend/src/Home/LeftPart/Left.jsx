import LogOut from "./LogOut";
import Search from "./Search";
import Users from "./Users";

function Left() {
    return (
        <div className="w-full  flex flex-col h-screen justify-between bg-black text-gray-300">
            <Search />
            <div
                className="flex-1 overflow-y-auto"
                style={{ maxHeight: "calc(90vh - 10vh)" }}
            >
                <Users />
            </div>
            <hr />
            <LogOut />
        </div>
    );
}

export default Left;
