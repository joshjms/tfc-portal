/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function CourseCard({ mod, image_url }) {
    if (!mod) {
        return (
            <div className="card w-full h-full bg-base-200">
                <figure>
                    <img src={image_url} alt="miku" className="w-full h-48 object-cover"/>
                </figure>
                <div className="card-body p-10 pb-16">
                    <h2 className="font-semibold text-xl">Name</h2>
                    <p>Description</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card w-full h-full bg-base-200">
            <figure>
                <img src={image_url} alt="miku" className="w-full h-48 object-cover"/>
            </figure>
            <div className="card-body p-10 pb-16">
                <h2 className="font-semibold text-xl text-primary">
                    {mod.name}
                </h2>
                <p>{mod.desc}</p>
                <div className="card-actions justify-end">
                    <Link href={"/learn/" + mod.slug}>
                        <button className="btn btn-primary">
                            Enter
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
