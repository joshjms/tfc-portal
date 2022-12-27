import { useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import Navbar from "../../../components/navbar";

export default function Learn({ user, chapter }) {
    const md = require("markdown-it")(),
        mk = require("markdown-it-katex");
    md.use(mk);
    const result = md.render(chapter.content);
    return (
        <>
            <Navbar user={user} />
            <div className="w-[80%] mx-auto py-10">
                <div
                    className="unreset"
                    dangerouslySetInnerHTML={{ __html: result }}
                />
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

    const { topic_slug, chapter_slug } = params;

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

    return { props: { user, chapter } };
}
