import React, {useContext, useEffect, useState} from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import {fetchAcademicYear, fetchDia, fetchProfileImage} from '../services/api'

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const [dia, setDia] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState("https://placehold.co/400");

    const baseLinkClass = "w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl text-sky-800 font-medium transition-all duration-200 hover:bg-sky-100";
    const activeLinkClass = "bg-sky-100 font-semibold";

    useEffect(() => {

        const loadDia = async () => {
            const year = await fetchAcademicYear();
            if (year) {
                let data = await fetchDia(year["id"]);
                setDia(data);
            }
        }

        const loadImage = async () => {
            try {
                const imageUrl = await fetchProfileImage();
                if (imageUrl) {
                    setProfileImageUrl(`data:image/png;base64, ${imageUrl}`);
                } else {
                    setProfileImageUrl("https://placehold.co/400");
                }
            } catch (err) {
                console.error("Error setting profile image:", err);
                setProfileImageUrl("https://placehold.co/400");
            }
        };

        loadDia().then(() => loadImage())

    }, []);

    return (
        <aside className="fixed bg-white w-80 shadow-lg rounded-br-2xl">
            <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
                {/* Profile section */}
                <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-14 h-14 rounded-full"
                />
                <div>
                    <h2 className="text-lg font-black text-sky-800">
                        Welcome, {dia ? dia["individuPrenomLatin"] : 'Loading...'}!
                    </h2>
                    <p className="text-sm text-sky-600">Student Portal</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-house"></i>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/timetable"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-calendar"></i>
                    <span>Timetable</span>
                </NavLink>

                <NavLink
                    to="/group-section"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-people-group"></i>
                    <span>Group & Section</span>
                </NavLink>

                <NavLink
                    to="/exams"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-clock"></i>
                    <span>Exams Schedule</span>
                </NavLink>

                <NavLink
                    to="/grades"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-star"></i>
                    <span>Exam Grades</span>
                </NavLink>

                <NavLink
                    to="/assessments"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-clipboard-check"></i>
                    <span>Assessments</span>
                </NavLink>

                <NavLink
                    to="/percentage"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-percent"></i>
                    <span>Percentage</span>
                </NavLink>

                <NavLink
                    to="/transcripts"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-pen-clip"></i>
                    <span>Transcripts</span>
                </NavLink>

                <NavLink
                    to="/debts"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-credit-card"></i>
                    <span>Debts</span>
                </NavLink>

                <NavLink
                    to="/enrollments"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <i className="fa-solid fa-file-signature"></i>
                    <span>Enrollments</span>
                </NavLink>

                <div id="logout-section" className="pt-15">
                    <button
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl text-red-600 font-semibold transition-all duration-200 hover:bg-red-50"
                        onClick={logout}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;