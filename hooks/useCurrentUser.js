import { useState, useEffect } from "react";

import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

const isTokenExpired = (token) => {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = Buffer.from(payloadBase64, "base64").toString();
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    const expired = Date.now() >= exp * 1000;
    return expired;
};

export function useCurrentUser() {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        const token = hasCookie("token") ? getCookie("token") : null;

        if (token && token.split('.')[1] && isTokenExpired(token)) {
            if (hasCookie("token")) deleteCookie("token");
            localStorage.removeItem("user");
        }

        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            setAuthenticated(true);
        }
        else setAuthenticated(false);
    }, []);

    return [user, authenticated];
}
