import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../../../components/navbar";
import Head from "next/head";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export default function Chapter({ chapter }) {
    const [user, authenticated] = useCurrentUser();

    const md = require("markdown-it")()
        .use(require("markdown-it-katex"))
        .use(require("markdown-it-sub"))
        .use(require("markdown-it-highlightjs"));

    console.log(chapter.content);

    const result = md.render(chapter.content);

    return (
        <>
            <Head>
                <title>{chapter.title}</title>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.css"
                    integrity="sha512-Av8h36R+zgh5kcdZXursq5ZiKVOEQ/K/M4lZcFsbPJMKfrRaUXatxZERx2s6LzAfVUcWg90Yycl4Gsfdgfd29A=="
                    crossorigin="anonymous"
                    referrerpolicy="no-referrer"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
                />
            </Head>
            <Navbar user={user} />
            <div className="w-[80%] md:w-[60%] lg:w-[50%] mx-auto py-10">
                <div
                    className="markdown-body font-sans bg-[#272935]"
                    dangerouslySetInnerHTML={{ __html: result }}
                />

                <hr className="my-5"></hr>

                <div className="flex gap-2 flex-wrap">
                    <button className="btn btn-success">Finish Reading</button>
                    <button className="btn btn-ghost">Edit</button>
                    <button className="btn btn-ghost">Delete</button>
                </div>
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
        paths: topics
            .map((e) =>
                e.chapter.map((f) => ({
                    params: {
                        topic_slug: e.slug,
                        chapter_slug: f.slug,
                    },
                }))
            )
            .flat(),
        fallback: "blocking",
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

    return { props: { chapter }, revalidate: 10 };
}
