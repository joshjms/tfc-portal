import { useEffect } from "react";
import axios from "axios";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";

import { useRouter } from "next/router";
import Loading from "../components/loading";

export default function Logout() {
    const router = useRouter();

    const handleLogout = () => {
        const token = hasCookie('token') ? getCookie('token') : null;

        axios.post(process.env.NEXT_PUBLIC_AUTH_BASE_URL + "token/logout/", token, {
            headers: {
                Authorization: "Token " + token,
            },
        })
        .then((response) => {
            if(response.status === 204) {
                if(hasCookie('token')) deleteCookie('token');
                localStorage.removeItem('user');
                router.push("/");
            }
        })
        .catch((error) => {
            router.push("/");
        })
    };
    

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <Loading />
    );
}
