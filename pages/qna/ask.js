import { useState, useEffect } from "react";
import axios from "axios";

import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../../components/navbar";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRouter } from "next/router";
import Loading from "../../components/loading";

export default function QNA() {
    const [user, authenticated] = useCurrentUser();
    const [isLoading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (authenticated === false) {
            router.push("/login/");
        }
    }, [authenticated]);

    const md = require("markdown-it")()
        .use(require("markdown-it-katex"))
        .use(require("markdown-it-sub"))
        .use(require("markdown-it-highlightjs"));

    const result = md.render(content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = hasCookie("token") ? getCookie("token") : null;

        await axios
            .post(
                process.env.NEXT_PUBLIC_API_BASE_URL + "blog/create/",
                {
                    title,
                    content,
                },
                {
                    headers: {
                        authorization: `JWT ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 201) {
                    router.push("/qna/");
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setMessage("");
                }
                if (error.response.status === 401) {
                    router.push("/login/");
                }
                setLoading(false);
            });
    };

    if (!user || isLoading) return <Loading />;

    return (
        <>
            <Head>
                <title>Ask TFC</title>
            </Head>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <h1 className="text-center text-3xl font-medium">
                    Ask TFC
                </h1>
                <form onSubmit={handleSubmit}>
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                        Title
                    </p>
                    <input
                        type="text"
                        placeholder="Soal OSN 2022 D1-A"
                        className="input input-bordered w-full mb-3 text-sm"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                        Content
                    </p>
                    <textarea
                        className="textarea textarea-bordered w-full mb-3 resize-none"
                        placeholder="Use Markdown and Latex"
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                    >
                        {content}
                    </textarea>
                    <label
                        htmlFor="markdown-render"
                        className="btn btn-sm bg-gray-800 text-white mb-5"
                    >
                        Preview
                    </label>
                    <input
                        type="checkbox"
                        id="markdown-render"
                        className="modal-toggle"
                    />
                    <div className="modal ">
                        <div className="modal-box relative max-w-none w-[80%] mx-auto py-10">
                            <label
                                htmlFor="markdown-render"
                                className="text-center btn-square btn-xs flex items-center justify-center border absolute right-2 top-2 hover:cursor-pointer hover:bg-red-800 hover:text-white duration-300"
                            >
                                ✕
                            </label>
                            <div
                                className="markdown-body font-sans"
                                dangerouslySetInnerHTML={{ __html: result }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button type="submit" className="w-max px-3 py-2 border hover:cursor-pointer hover:bg-green-800 hover:text-white duration-300">
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
