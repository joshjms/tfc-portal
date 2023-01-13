import "../styles/globals.css";
import Navbar from "../components/navbar";

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
    const [isPageLoading, setPageLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", (url, { shallow }) => {
            setPageLoading(true);
        });
    }, []);

    useEffect(() => {
        router.events.on("routeChangeComplete", (url) => {
            setPageLoading(false);
        });
    }, []);

    if (isPageLoading) return <Loading />;

    return <Component {...pageProps} />;
}
