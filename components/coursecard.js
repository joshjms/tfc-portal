/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";

export default function CourseCard({ mod, image_url }) {
    if (!mod) {
        return null;
    }

    return (
        <>
            <div className="card w-80 hover:bg-gray-100 rounded-none border">
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
                    <h2 className="text-xl font-medium text-primary">{mod.name}</h2>
                    <Link href={"/learn/" + mod.slug}>
                        <button className="bg-gray-800 btn-circle text-white flex items-center justify-center absolute -top-5 right-5">
                            <i className="fa-solid fa-book-open text-xl"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
