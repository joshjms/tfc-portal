import Link from "next/link";

export default function Progress({ user }) {
    if (user === null || !user) {
        return (
            <>
                <h3 className="text-3xl font-bold mb-3">Your Progress</h3>
                <p>
                    <Link
                        href="/login/"
                        className="text-primary hover:underline"
                    >
                        Sign in
                    </Link>{" "}
                    to see your progress.
                </p>
            </>
        );
    }

    return (
        <>
            <h3 className="text-3xl font-bold mb-3">Your Progress</h3>

            <p className="mb-10">
                You have completed <strong>{user.account.solved.length}</strong>{" "}
                courses!
            </p>
        </>
    );
}
