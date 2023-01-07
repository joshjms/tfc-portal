export default function Alert({ content, close }) {
    return (
        <div className="w-full flex justify-center fixed top-10">
            <div className="alert bg-error w-96 shadow-xl">
                <div>
                    <div>
                        <p className="text-white">{content}</p>
                    </div>
                </div>
                <div className="flex-none">
                    <button className="btn btn-sm btn-primary" onClick={close}>
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}
