import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import { useRouter } from "next/router";
import Loading from "../components/loading";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [isLoading, setLoading] = useState(false);

    const getUser = async () => {
        const token = hasCookie("token")
            ? getCookie("token")
            : null;

        await axios
            .get(process.env.NEXT_PUBLIC_API_BASE_URL + "user/", {
                headers: {
                    authorization: `JWT ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    setLoading(false);
                    router.push('/');
                }
                return null;
            })
            .catch((error) => {
                setLoading(false);
                return null;
            });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .post(process.env.NEXT_PUBLIC_AUTH_BASE_URL + "jwt/create/", {
                username,
                password,
            })
            .then((response) => {
                if (response.status === 200) {
                    setCookie("token", response.data.access);
                    getUser();
                }
            })
            .catch((error) => {
                setMessage("Wrong username or password.");
                setLoading(false);
            });
    };

    const msg = message ? (
        <p className="mb-3 text-xs text-warning">{message}</p>
    ) : null;

    if(isLoading) return <Loading />

    return (
        <div className="flex">
            <div className="h-screen w-[100%] lg:w-[45%] flex items-center justify-center p-5">
                <div className="w-80 max-w-[100%] lg:w-96">
                    <h3 className="text-xl lg:text-3xl font-medium mb-3">
                        Welcome back
                    </h3>
                    <p className="text-gray-600 text-sm mb-7">
                        Welcome back! Please enter your details.
                    </p>

                    <form onSubmit={handleLogin}>
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                            Username
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="input input-bordered w-full mb-3"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                            Password
                        </p>
                        <input
                            type="password"
                            placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                            className="input input-bordered w-full mb-3"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {msg}
                        {/* <p className="mb-2">
                            <Link
                                href="#"
                                className="text-xs font-medium text-primary"
                            >
                                Forgot password
                            </Link>
                        </p> */}
                        <button className="btn btn-primary w-full">
                            Sign In
                        </button>

                        <p className="text-center text-xs mt-3 font-medium text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register/"
                                className="text-primary font-semibold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="hidden lg:flex h-screen w-[55%] items-center justify-center">
                <Image
                    src="/reading_time.svg"
                    alt="read"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}
