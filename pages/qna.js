import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/navbar";
import LoadingComponent from "../components/loadingComponent";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Pagination from "../components/pagination";
import { useRouter } from "next/router";
import Loading from "../components/loading";

export default function QNA() {
    const [user, authenticated] = useCurrentUser();
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(0);

    const [isLoading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getPostCount = async () => {
            await axios
                .get(process.env.NEXT_PUBLIC_API_BASE_URL + "blog/count/")
                .then((response) => {
                    if (response.status === 200) {
                        setPages(response.data.pages);
                    }
                });
        };
        getPostCount();
    }, []);

    useEffect(() => {
        setPosts([]);
        setLoading(true);
        const getPosts = async () => {
            const page = router.query.page || "1";
            await axios
                .get(process.env.NEXT_PUBLIC_API_BASE_URL + "blog/list/", {
                    params: {
                        page: page,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        setPosts(response.data);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setPosts([]);
                    setLoading(false);
                });
        };
        getPosts();
    }, [router.query.page]);

    if(isLoading) return <Loading />

    const content = isLoading ? (
        <div className="w-full flex justify-center">
            <LoadingComponent />
        </div>
    ) : (
        <>
            <div className="w-full mb-3 flex justify-end">
                <Link href="/qna/ask">
                    <div className="flex items-center px-3 py-2 border hover:bg-gray-800 hover:text-white duration-300 text-sm">
                        <i class="fa-solid fa-plus font-extralight mr-1"></i>{" "}
                        Post Question
                    </div>
                </Link>
            </div>
            <Pagination pageCount={pages} />
            <div className="my-5">
                {posts.map((e, i) => {
                    return (
                        <div className="w-full border p-5 mb-3" key={i}>
                            <Link href={"/qna/" + e.id.toString()}>
                                <h3 className="text-xl font-medium mb-1 cursor-pointer">
                                    {e.title}
                                </h3>
                            </Link>

                            <p className="text-gray-600 text-xs mb-3">
                                {e.content.slice(0, 100)}
                            </p>

                            <p className="text-xs">
                                Written by{" "}
                                <span className="font-bold">
                                    {e.author.username}
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>
            <Pagination pageCount={pages} />
        </>
    );

    return (
        <>
            <Head>
                <title>TFC - QNA</title>
            </Head>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <h1 className="text-center text-3xl font-medium">QNA</h1>
                <div className="my-10">{content}</div>
            </div>
        </>
    );
}
