import { useState, useEffect } from "react";
import axios from "axios";

import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../../components/navbar";
import Loading from "../../components/loading";
import Head from "next/head";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRouter } from "next/router";
import Alert from "../../components/alert";

export default function Create({ topics }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [user, authenticated] = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if ((user && user.is_staff === false) || authenticated === false) {
            router.push("/learn/");
        }
    }, [user]);

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
                process.env.NEXT_PUBLIC_API_BASE_URL + "learn/create/",
                {
                    title,
                    content,
                    topic,
                },
                {
                    headers: {
                        authorization: `JWT ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 201) {
                    router.push("/learn/");
                }
            })
            .catch((error) => {
                if(error.response.status === 400) {
                    setMessage(error.response.data.message);
                }
                if(error.response.status === 401) {
                    router.push("/learn/");
                }
                setLoading(false);
            });
    };

    const messageAlert = message ? (
        <Alert content={message} close={()=>{setMessage("")}} />
    ) : null;

    if (!user || loading) return <Loading />;

    return (
        <>
            <Head>
                <title>TFC - Create a Chapter</title>
            </Head>
            {messageAlert}
            <Navbar user={user} />
            <div className="w-96 lg:w-[50%] mx-auto py-10">
                <form onSubmit={handleSubmit}>
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                        Title
                    </p>
                    <input
                        type="text"
                        placeholder="Convex Hull Trick"
                        className="input input-bordered w-full mb-3"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                        Content
                    </p>
                    <textarea
                        className="textarea textarea-bordered w-full mb-3"
                        placeholder="Use Markdown and Latex"
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                    >
                        {content}
                    </textarea>
                    <label
                        htmlFor="markdown-render"
                        className="btn btn-sm mb-5"
                    >
                        Preview
                    </label>
                    <input
                        type="checkbox"
                        id="markdown-render"
                        className="modal-toggle"
                    />
                    <div className="modal ">
                        <div className="modal-box relative w-[80%] md:w-[60%] lg:w-[50%] mx-auto py-10">
                            <label
                                htmlFor="markdown-render"
                                className="btn btn-sm btn-circle absolute right-2 top-2"
                            >
                                ✕
                            </label>
                            <div
                                className="markdown-body font-sans bg-[#F2F2F2]"
                                dangerouslySetInnerHTML={{ __html: result }}
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                        Topic
                    </p>
                    <input
                        type="text"
                        placeholder="Dynamic Programming"
                        className="input input-bordered w-full mb-3"
                        onChange={(e) => setTopic(e.target.value)}
                        value={topic}
                    />

                    <button className="btn btn-primary w-full">Publish</button>
                </form>
            </div>
        </>
    );
}
