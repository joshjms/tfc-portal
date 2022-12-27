import "../styles/globals.css";
import Navbar from "../components/navbar";

import axios from "axios";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
