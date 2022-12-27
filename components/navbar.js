import Link from "next/link";
import * as React from "react";

export default function Navbar({ user }) {
    if (user === null || !user) {
        return (
            <div className="navbar bg-base-200 z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
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
                                <ul className="p-2">
                                    <li>
                                        <a>Search</a>
                                    </li>
                                    <li>
                                        <a>Catalog</a>
                                    </li>
                                </ul>
                            </li>
                            <li tabIndex={0}>
                                <a className="justify-between">
                                    Resources
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
                                <ul className="p-2">
                                    <li>
                                        <a>Blog</a>
                                    </li>
                                    <li>
                                        <a>Connect</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link
                        href="/"
                        className="btn btn-ghost normal-case text-xl font-black"
                    >
                        TFC
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
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
                            <ul className="p-2 bg-base-300 z-10">
                                <li>
                                    <a>Search</a>
                                </li>
                                <li>
                                    <a>Catalog</a>
                                </li>
                            </ul>
                        </li>
                        <li tabIndex={0}>
                            <a>
                                Resources
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
                            <ul className="p-2 bg-base-300 z-10">
                                <li>
                                    <a>Blog</a>
                                </li>
                                <li>
                                    <a>Connect</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/login/">Sign in</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="navbar bg-base-200 z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
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
                            <ul className="p-2">
                                <li>
                                    <a>Search</a>
                                </li>
                                <li>
                                    <a>Catalog</a>
                                </li>
                            </ul>
                        </li>
                        <li tabIndex={0}>
                            <a className="justify-between">
                                Resources
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
                            <ul className="p-2 z-10">
                                <li>
                                    <a>Blog</a>
                                </li>
                                <li>
                                    <a>Connect</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <Link
                    href="/"
                    className="btn btn-ghost normal-case text-xl font-black"
                >
                    TFC
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
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
                        <ul className="p-2 bg-base-300 z-10">
                            <li>
                                <a>Search</a>
                            </li>
                            <li>
                                <a>Catalog</a>
                            </li>
                        </ul>
                    </li>
                    <li tabIndex={0}>
                        <a>
                            Resources
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
                        <ul className="p-2 bg-base-300 z-10">
                            <li>
                                <a>Blog</a>
                            </li>
                            <li>
                                <a>Connect</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
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
                        <ul className="p-2 bg-base-300 z-10">
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
        </div>
    );
}
