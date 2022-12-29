import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Announcements from "../components/announcements";
import Navbar from "../components/navbar";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    return (
        <>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <Announcements />
            </div>
        </>
    );
}