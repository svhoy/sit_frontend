import React, { useState, useContext } from "react"

import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

export default function NavBar() {
    const [navbar, setNavbar] = useState(false)

    let { user, logoutUser } = useContext(AuthContext)

    return (
        <nav className=" w-full bg-blue-600 shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="/">
                            <h2 className="text-2xl font-bold text-white">LOGO</h2>
                        </a>
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="p-2 text-gray-200 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => {
                                    return setNavbar(!navbar)
                                }}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 
                    ${navbar ? "block" : "hidden"}`}
                >
                    <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {user ? (
                            <>
                                <li className="text-gray-200 hover:text-gray-900">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="dropdown">
                                    <Link to="/devices">
                                        <button
                                            type="button"
                                            className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-200 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                                        >
                                            Devices
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Link>
                                    <div className="dropdown-menu z-10 p-3 hidden bg-blue-500 rounded-lg shadow">
                                        <ul className="py-2 text-sm">
                                            <li className="text-gray-200 hover:text-gray-900">
                                                <Link to="/devices/ble">Connection</Link>
                                            </li>
                                            <li className="text-gray-200 hover:text-gray-900">
                                                <Link to="/devices/settings">Settings</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="dropdown">
                                    <Link to="/calibration/">
                                        <button
                                            type="button"
                                            className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-200 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                                        >
                                            Calibration
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Link>
                                    <div className="dropdown-menu z-10 p-3 hidden bg-blue-500 dark:bg-blue-900 rounded-lg shadow">
                                        <ul className="py-2 text-sm">
                                            <li className="text-gray-200 hover:text-gray-900">
                                                <Link to="/calibration/start">Start</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="dropdown">
                                    <Link to="/tests/">
                                        <button
                                            type="button"
                                            className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-200 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                                        >
                                            Tests
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Link>
                                    <div className="dropdown-menu z-10 p-3 hidden bg-blue-500 rounded-lg shadow">
                                        <ul className="py-2 text-sm">
                                            <li className="text-gray-200 hover:text-gray-900">
                                                <Link to="/tests/groups">Groups</Link>
                                            </li>
                                            <li className="text-gray-200 hover:text-gray-900">
                                                <Link to="/distance">Distance List</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="text-gray-200 hover:text-gray-900">
                                    <span
                                        onClick={logoutUser}
                                        onKeyDown={logoutUser}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        Logout
                                    </span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="text-gray-200 hover:text-gray-900">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="text-gray-200 hover:text-gray-900">
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
