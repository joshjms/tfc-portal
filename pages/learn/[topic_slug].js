import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/navbar";

export default function Topic({ topic }) {
    const { asPath } = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    if (!user) {
        return (
            <>
                <Navbar user={user} />
                <div className="w-[80%] mx-auto py-10">
                    <div className="w-80 lg:w-96 mb-10">
                        <h2 className="font-light text-3xl mb-3">
                            {topic.name}
                        </h2>
                        <p>{topic.desc}</p>
                    </div>

                    <div className="">
                        {topic.chapter.map((e, i) => (
                            <div
                                className="bg-base-200 p-5 rounded-2xl mb-3 flex justify-between items-center"
                                key={i}
                            >
                                <Link href={`${asPath}/${e.slug}`}>
                                    <p>{e.title}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <div className="w-80 lg:w-96 mb-10">
                    <h2 className="font-light text-3xl mb-3">{topic.name}</h2>
                    <p>{topic.desc}</p>
                </div>

                <div className="">
                    {topic.chapter.map((e, i) => (
                        <Link href={`${asPath}/${e.slug}`} key={i}>
                            <div
                                className={
                                    (user.account.solved.findIndex(
                                        (f) => e.id === f.id
                                    ) != -1
                                        ? "bg-success "
                                        : "bg-base-200 ") +
                                    "p-5 rounded-2xl mb-3 flex justify-between items-center"
                                }
                            >
                                <p>{e.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getStaticProps({ req, res, params }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );

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

    return { props: { topic } };
}
