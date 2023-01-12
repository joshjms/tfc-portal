export default function LoadingComponent () {
    return (
        <div className="flex items-center justify-center flex-col gap-5">
            <img src="/pearl.jpg" alt="loading" />
            <h2 className="text-2xl font-extralight">Please wait for a moment...</h2>
        </div>
    )
}