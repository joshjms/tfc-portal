import { useEffect } from "react";
import axios from "axios";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";

import { useRouter } from "next/router";
import Loading from "../components/loading";

import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Logout() {
    const router = useRouter();

    const [user, authenticated] = useCurrentUser();

    useEffect(()=> {
        if(authenticated === false)
            router.push('/');
    }, [authenticated]);

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
