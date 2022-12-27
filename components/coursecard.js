import Link from "next/link";

export default function CourseCard({ mod, progress }) {
    const color =
        progress >= 80
            ? "text-success"
            : progress >= 50
            ? "text-info"
            : progress >= 30
            ? "text-warning"
            : "text-error";

    if (!mod) {
        return (
            <div className="card w-full h-full bg-base-200 p-10">
                <div className="flex items-center justify-center">
                    <div
                        className="radial-progress font-bold text-error bg-error-content text-5xl"
                        style={{
                            "--value": "1".toString(),
                            "--size": "8rem",
                        }}
                    ></div>
                </div>
                <div className="card-body text-center">
                    <h2 className="font-semibold text-xl text-center">Name</h2>
                    <p>Description</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card w-full h-full bg-base-200 p-10">
            <div className="flex items-center justify-center">
                <div
                    className={"radial-progress font-bold text-5xl " + color}
                    style={{
                        "--value": progress.toString(),
                        "--size": "8rem",
                    }}
                ></div>
            </div>
            <div className="card-body text-center">
                <Link href={"/learn/" + mod.slug}>
                    <h2 className="font-semibold text-xl text-center text-secondary hover:underline">
                        {mod.name}
                    </h2>
                </Link>

                <p>{mod.desc}</p>
            </div>
        </div>
    );
}
