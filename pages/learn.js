import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import Head from "next/head";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Learn({ topics }) {
    const [user, authenticated] = useCurrentUser();

    return (
        <>
            <Head>
                <title>TFC - Learn</title>
            </Head>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <div className="flex h-max my-10">
                    <Carousel user={user} slides={topics} />
                </div>
            </div>
        </>
    );
}

export async function getStaticProps({ req, res }) {
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

    return {
        props: { topics },
        revalidate: 10,
    };
}
