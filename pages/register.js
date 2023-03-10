import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Loading from "../components/loading";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRe_Password] = useState("");

    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const [user, authenticated] = useCurrentUser();

    useEffect(()=> {
        if(authenticated === true)
            router.push('/');
    }, [authenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = await axios
            .post(process.env.NEXT_PUBLIC_AUTH_BASE_URL + "users/", {
                email,
                username,
                password,
                re_password,
            })
            .then((response) => {
                if (response.status === 201) {
                    router.push("/login/");
                }
            })
            .catch((error) => {
                const err_msg = (error.response.data.username || error.response.data.password || error.response.data.non_field_errors);
                setMessage(err_msg[0]);
                setLoading(false);
            });
    };

    const msg = message ? (
        <p className="mb-3 text-xs text-warning">{message}</p>
    ) : null;

    if (isLoading) return <Loading />

    return (
        <div className="flex">
            <div className="h-screen w-[100%] lg:w-[45%] flex items-center justify-center p-5">
                <div className="w-80 max-w-[100%] lg:w-96">
                    <h3 className="text-xl lg:text-3xl font-medium mb-3">
                        First time?
                    </h3>
                    <p className="text-gray-600 text-sm mb-7">
                        Put in your details so we can sign you up!
                    </p>

                    <form onSubmit={handleLogin}>
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                            Email
                        </p>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="input input-bordered w-full mb-3"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                            Username
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="input input-bordered w-full mb-3"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                            Password
                        </p>
                        <input
                            type="password"
                            placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                            className="input input-bordered w-full mb-3"
                            onChange={(e) => setRe_Password(e.target.value)}
                        />
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                            Password Again
                        </p>
                        <input
                            type="password"
                            placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                            className="input input-bordered w-full mb-3"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {msg}
                        <button className="btn btn-primary w-full mt-3">
                            Sign Up
                        </button>

                        <p className="text-center text-xs mt-3 font-medium text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary font-semibold"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="hidden lg:flex h-screen w-[55%] items-center justify-center">
                <Image src="/dog.svg" alt="dog" width={500} height={500} />
            </div>
        </div>
    );
}
