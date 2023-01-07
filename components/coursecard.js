/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";

export default function CourseCard({ mod, image_url }) {
    if (!mod) {
        return null;
    }

    return (
        <>
            <div className="card w-80 lg:w-96 h-[70%] bg-base-200/50 rounded-[2rem]">
                <figure>
                    <img
                        src={image_url}
                        alt="miku"
                        className="w-full h-48 object-cover"
                    />
                </figure>
                <div className="card-body relative">
                    <p className="text-gray-600 uppercase text-xs font-semibold">
                        Courses
                    </p>
                    <h2 className="font-medium text-primary">{mod.name}</h2>
                    <Link href={"/learn/" + mod.slug}>
                        <button className="btn btn-secondary btn-circle hidden text-center shadow-lg shadow-secondary absolute -top-5 right-5">
                            <i className="fa-solid fa-book-open text-xl"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
