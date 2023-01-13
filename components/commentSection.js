import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function CommentSection({ setLoading }) {
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getComments = async () => {
            await axios
                .get(
                    process.env.NEXT_PUBLIC_API_BASE_URL +
                        "blog/detail/" + router.query.id + "/comment/list/",
                    {}
                )
                .then((response) => {
                    if (response.status === 200) {
                        setComments(response.data);
                    }
                })
                .catch((error) => {
                });
        }
        getComments();
    }, []);

    const handleComment = async () => {
        setLoading(true);
        const token = hasCookie("token") ? getCookie("token") : null;
        await axios
            .post(
                process.env.NEXT_PUBLIC_API_BASE_URL +
                    "blog/detail/" +
                    router.query.id +
                    "/comment/create/",
                {
                    content: commentContent,
                },
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

    return (
        <>
            <div className="p-1 border mb-5">
                <textarea
                    rows={5}
                    className="w-full h-full focus:outline-none text-sm resize-none border p-4"
                    value={commentContent}
                    onChange={(e)=>setCommentContent(e.target.value)}
                    placeholder="Write a comment..."
                ></textarea>
                <div className="flex justify-end">
                    <div
                        onClick={handleComment}
                        className="flex items-center px-3 py-2 border hover:bg-gray-800 hover:text-white duration-300 text-sm cursor-pointer"
                    >
                        + Comment
                    </div>
                </div>
            </div>

            {
                comments.map((e, i) => {
                    return (
                        <div className="my-3 border p-5" key={i}>
                            <h3 className="mb-2">{e.user.username}</h3>
                            <p className="text-xs">{e.content}</p>
                        </div>
                    );
                })
            }
        </>
    );
}
