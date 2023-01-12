import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import Head from "next/head";
import { useCurrentUser } from "../hooks/useCurrentUser";
import CourseCard from "../components/coursecard";

export default function Learn({ topics }) {
    const [user, authenticated] = useCurrentUser();
    const topicList = topics.sort((a, b) => a.id - b.id);

    return (
        <>
            <Head>
                <title>TFC - Learn</title>
            </Head>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <h1 className="text-center text-3xl font-medium">Courses</h1>
                <div className="flex flex-wrap gap-4 h-max my-10 justify-center">
                    {topicList.map((e, i) => {
                        return (
                            <div className="w-80" key={i}>
                                <CourseCard
                                    mod={e}
                                    key={i}
                                    image_url={`/courses_wp/${(
                                        i + 1
                                    ).toString()}.jpg`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export async function getStaticProps({ req, res }) {
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
        props: { topics },
        revalidate: 10,
    };
}
