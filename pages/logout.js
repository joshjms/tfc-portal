import { useEffect } from "react";
import axios from "axios";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";

import { useRouter } from "next/router";
import Loading from "../components/loading";

export default function Logout() {
    const router = useRouter();

    const handleLogout = () => {
        if (hasCookie("token")) deleteCookie("token");
        localStorage.removeItem("user");
        router.push("/");
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return <Loading />;
}
