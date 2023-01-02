import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/navbar";
import Head from "next/head";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function Topic({ topic }) {
    const { asPath } = useRouter();

    const user = useCurrentUser();

    return (
        <>
            <Head>
                <title>{topic.name}</title>
            </Head>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <div className="w-80 lg:w-96 mb-10">
                    <h2 className="font-light text-3xl mb-3">{topic.name}</h2>
                    <p>{topic.desc}</p>
                </div>

                <div className="">
                    {topic.chapter.map((e, i) => (
                        <Link href={`${asPath}/${e.slug}`} key={i}>
                            <div className="bg-base-200 p-5 rounded-sm mb-3 flex justify-between items-center">
                                <p>{e.title}</p>
                            </div>
                        </Link>
                    ))}
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
        paths: topics.map((e) => ({
            params: {
                topic_slug: e.slug,
            },
        })),
        fallback: "blocking",
    };
}

export async function getStaticProps({ req, res, params }) {
    const { topic_slug } = params;

    const topic = await axios
        .get(
            process.env.NEXT_PUBLIC_API_BASE_URL + "learn/detail/" + topic_slug,
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

    return { props: { topic }, revalidate: 10 };
}
