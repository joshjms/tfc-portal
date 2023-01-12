export default function Announcements() {
    return (
        <>
            <h3 className="text-3xl font-bold mb-10">Announcements</h3>

            <div className="flex gap-4 flex-wrap mb-5">
                <div className="w-80 p-5 border bg-white hover:bg-gray-100">
                    <p className="text-sm mb-3">Dec 12, 2022</p>
                    <h3 className="text-xl font-medium mb-5">Welcome</h3>

                    <p className="text-sm mb-2">
                        Welcome to TFC&apos;s official portal. We will continue
                        to post valuable resources to kickstart your competitive
                        programming journey. Hope this helps!
                    </p>
                    <p className="text-sm mb-2">
                        P.S. Some links are dead and will be activated some time
                        in the future.
                    </p>
                </div>
            </div>
        </>
    );
}
