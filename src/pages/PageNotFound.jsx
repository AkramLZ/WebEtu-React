import React from "react";
import {NavLink} from "react-router";

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50">
            <div className="max-w-md w-full p-6 bg-white shadow-xl rounded-xl flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-red-700">404</p>
                <p className="font-semibold text-lg p-4">Page not found</p>
                <nav>
                    <NavLink
                        to="/dashboard"
                        className="flex items-center space-x-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-extrabold text-white bg-gradient-to-r from-[#0284c7] to-[#0369a1]"
                    >
                        <i className="fa-solid fa-house mr-2"></i>
                        Go Back to Dashboard
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default PageNotFound;