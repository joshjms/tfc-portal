import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../../components/navbar";
import Alert from "../../components/alert";
import Head from "next/head";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRouter } from "next/router";

import Loading from "../../components/loading";
import CommentSection from "../../components/commentSection";

export default function Question() {
    const [user, authenticated] = useCurrentUser();

    const [post, setPost] = useState(null);
    const [upvote, setUpvote] = useState(null);
    const [message, setMessage] = useState(null);

    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getQuestion = async (id) => {
            await axios
                .get(
                    process.env.NEXT_PUBLIC_API_BASE_URL +
                        "blog/detail/" +
                        id.toString(),
                    {}
                )
                .then((response) => {
                    if (response.status === 200) {
                        setPost(response.data);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        };
        const getUpvoteStatus = async (id) => {
            const token = hasCookie("token") ? getCookie("token") : null;
            await axios
                .get(
                    process.env.NEXT_PUBLIC_API_BASE_URL +
                        "blog/upvote/" +
                        id +
                        "/status/",
                    {
                        headers: {
                            authorization: `JWT ${token}`,
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200)
                        setUpvote(response.data.upvoteStatus);
                    else setUpvote(false);
                })
                .catch((error) => {
                    setUpvote(false);
                });
        };
        if (router.query.id) {
            getQuestion(router.query.id);
            getUpvoteStatus(router.query.id);
        }
    }, [router.query.id]);

    const handleUpvote = async () => {
        setLoading(true);
        const token = hasCookie("token") ? getCookie("token") : null;
        await axios
            .post(
                process.env.NEXT_PUBLIC_API_BASE_URL +
                    "blog/upvote/" +
                    router.query.id +
                    "/",
                {},
                {
                    headers: {
                        authorization: `JWT ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 201) {
                    router.reload();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    setMessage("You have to be logged in to do this.");
                } else {
                    setMessage(error.response.data.message);
                }
                setLoading(false);
            });
    };

    const messageAlert = message ? (
        <Alert
            content={message}
            close={() => {
                setMessage("");
            }}
        />
    ) : null;

    if (post === null || upvote === null || isLoading) return <Loading />;

    const md = require("markdown-it")()
        .use(require("markdown-it-katex"))
        .use(require("markdown-it-sub"))
        .use(require("markdown-it-highlightjs"));

    const result = md.render(post.content);

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            {messageAlert}
            <Navbar user={user} />
            <div className="w-[80%] md:w-[60%] lg:w-[50%] mx-auto py-10">
                <div className="p-5 border mb-5">
                    <h1 className="mb-1 text-3xl">{post.title}</h1>
                    <p className="text-xs text-gray-600 mb-5">
                        Question by{" "}
                        <span className="font-bold">
                            {post.author.username}
                        </span>
                    </p>
                    <div
                        className="markdown-body font-sans"
                        dangerouslySetInnerHTML={{ __html: result }}
                    />
                    <div onClick={handleUpvote} className={"mt-3 w-max py-1 px-3 border rounded-full cursor-pointer text-sm " + (upvote ? "bg-blue-800/50" : null)}>
                        ❤️ {post.upvoteCount}
                    </div>
                </div>
                <CommentSection setLoading={setLoading} />
            </div>
        </>
    );
}
