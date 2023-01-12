import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Pagination({ pageCount }) {
    const router = useRouter();
    const page = parseInt(router.query.page) || 1;

    if (!page) return null;

    const pagination = [Math.max(1, page - 2)]
    pagination.push(pagination[0] + 1, pagination[0] + 2, pagination[0] + 3, pagination[0] + 4)

    console.log(pagination);

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="border flex">
                    {pagination.map((e, i) => {
                        if (e <= 0 || e > pageCount)
                            return null;

                        return (
                            <Link
                                href={{ pathname: "/qna/", query: { page: e } }}
                                key={i}
                            >
                                <div className={"w-10 h-10 flex items-center justify-center" + (e === page ? " bg-gray-100" : " hover:bg-gray-100")}>{e}</div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
