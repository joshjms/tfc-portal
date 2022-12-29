import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../../../components/navbar";

export default function Chapter({ chapter }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    const md = require("markdown-it")()
        .use(require("markdown-it-katex"))
        .use(require("markdown-it-sub"));

    const result = md.render(chapter.content);

    return (
        <>
            <Navbar user={user} />
            <div className="w-[80%] md:w-[60%] lg:w-[50%] mx-auto py-10">
                <div
                    className="markdown-body font-sans"
                    dangerouslySetInnerHTML={{ __html: result }}
                />
            </div>
        </>
    );
}

export async function getStaticPaths() {
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
        paths: topics.map((e) =>
            e.chapter.map((f) => ({
                params: {
                    topic_slug: e.slug,
                    chapter_slug: f.slug,
                },
            }))
        ).flat(),
        fallback: false,
    };
}

export async function getStaticProps({ req, res, params }) {
    const { chapter_slug } = params;

    const chapter = await axios
        .get(
            process.env.NEXT_PUBLIC_API_BASE_URL +
                "learn/chapter/" +
                chapter_slug,
            {}
        )
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return null;
        })
        .catch((error) => {
            return null;
        });

    return { props: { chapter } };
}
