import { useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/navbar";

export default function Learn({ user, topic }) {
    const { asPath } = useRouter();

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
                        <div
                            className={
                                (user.account.solved.findIndex(
                                    (f) => e.id === f.id
                                ) != -1
                                    ? "bg-success "
                                    : "bg-base-200 ") +
                                "p-5 rounded-2xl mb-3 flex justify-between items-center"
                            }
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

export async function getServerSideProps({ req, res, params }) {
    const token = hasCookie("token", { req, res })
        ? getCookie("token", { req, res })
        : null;

    const user = await axios
        .get(process.env.NEXT_PUBLIC_API_BASE_URL + "user/", {
            headers: {
                authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return null;
        })
        .catch((error) => {
            return null;
        });

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

    return { props: { user, topic } };
}
