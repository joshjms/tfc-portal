import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Announcements from "../components/announcements";
import Navbar from "../components/navbar";
import Head from "next/head";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Home() {
    const [user, authenticated] = useCurrentUser();

    return (
        <>
            <Head>
                <title>TFC - Competitive Programming Companion</title>
            </Head>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <Announcements />
            </div>
        </>
    );
}