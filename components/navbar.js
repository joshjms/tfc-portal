import Link from "next/link";
import * as React from "react";

export default function Navbar({ user }) {
    const navbarEnd = user ? (
        <div className="navbar-end">
            <ul className="menu menu-horizontal px-1">
                <li tabIndex={0}>
                    <a>
                        {user.username}
                        <svg
                            className="fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </a>
                    <ul className="bg-white border z-10">
                        <li>
                            <a>Profile</a>
                        </li>
                        <li>
                            <Link href="/logout/">Logout</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    ) : (
        <div className="navbar-end">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link href="/login/">Sign in</Link>
                </li>
            </ul>
        </div>
    );

    return (
        <div className="navbar bg-white z-10 border-b">
            <div className="navbar-start">
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn border-none bg-white text-black hover:bg-gray-100 rounded-none lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 border w-52 bg-white"
                    >
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/learn/">Learn</Link>
                        </li>
                        <li tabIndex={0}>
                            <a className="justify-between">
                                Problems
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </a>
                            <ul className=" bg-white border">
                                <li>
                                    <a>Search</a>
                                </li>
                                <li>
                                    <a>Catalog</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/qna/">QNA</Link>
                        </li>
                    </ul>
                </div>
                <Link
                    href="/"
                    className="btn btn-ghost normal-case text-xl font-black text-primary"
                >
                    TFC
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/learn/">Learn</Link>
                    </li>
                    <li tabIndex={0}>
                        <a>
                            Problems
                            <svg
                                className="fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                        </a>
                        <ul className="bg-white border z-10">
                            <li>
                                <a>Search</a>
                            </li>
                            <li>
                                <a>Catalog</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/qna/">QNA</Link>
                    </li>
                </ul>
            </div>
            {navbarEnd}
        </div>
    );
}
