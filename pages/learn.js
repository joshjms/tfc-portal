import { useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import Progress from "../components/progress";

export default function Learn({ user, topics }) {
    return (
        <>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <div className="flex h-max my-10">
                    <Carousel user={user} slides={topics} />
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps({ req, res }) {
    const token = hasCookie("token", { req, res })
        ? getCookie("token", { req, res })
        : null;

    const user = await axios
        .get(process.env.NEXT_PUBLIC_API_BASE_URL + "user/", {
            headers: {
                authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return null;
        })
        .catch((error) => {
            return null;
        });

    const topics = await axios
        .get(process.env.NEXT_PUBLIC_API_BASE_URL + "learn/list/", {})
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return null;
        })
        .catch((error) => {
            return null;
        });

    return { props: { user, topics } };
}
