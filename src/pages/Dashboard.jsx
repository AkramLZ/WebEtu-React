import React, { useEffect, useState } from 'react';
import { fetchIndividu } from '../services/api';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    const [individu, setIndividu] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetchIndividu();
                setIndividu(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(() => {});
    }, []);

    return (
        <div className={`min-h-screen flex bg-sky-50`}>
            <Sidebar />
            <main className={`bg-sky-50 flex-1 p-8 ml-80`}>
                <div id="dashboard-header" className="mb-8">
                    <h1 className="text-4xl font-black text-sky-800 mb-2">Student Dashboard</h1>
                    <p className="text-sky-600">Manage your academic information</p>
                </div>
                <div id="content-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div id="personal-info-card"
                         className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8 transition-all duration-300">
                        <h2 className="text-2xl font-black text-sky-800 ">
                            <i className={`fa-solid fa-user-circle mr-3`}></i>
                            Personal Information
                        </h2>

                        <div className="space-y-6 pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div id="first-name" className="space-y-2">
                                    <label className="block text-sm font-semibold text-sky-800">First
                                        Name</label>
                                    <div
                                        className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                            <span className="text-sky-900 font-medium">
                                                {individu ? individu['prenomLatin'] : 'Loading'}
                                            </span>
                                    </div>
                                </div>
                                <div id="last-name" className="space-y-2">
                                    <label className="block text-sm font-semibold text-sky-800">Last
                                        Name</label>
                                    <div
                                        className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                            <span className="text-sky-900 font-medium">
                                                {individu ? individu['nomLatin'] : 'Loading'}
                                            </span>
                                    </div>
                                </div>
                            </div>

                            <div id="birth-date" className="space-y-2">
                                <label className="block text-sm font-semibold text-sky-800">Birth
                                    Date</label>
                                <div
                                    className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                            <span className="text-sky-900 font-medium">
                                                {individu ? individu['dateNaissance'] : 'Loading'}
                                            </span>
                                </div>
                            </div>

                            <div id="birth-place" className="space-y-2">
                                <label className="block text-sm font-semibold text-sky-800">Birth
                                    Place</label>
                                <div
                                    className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                            <span className="text-sky-900 font-medium">
                                                {individu ? individu['lieuNaissance'] : 'Loading'}
                                            </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="highschool-info-card"
                         className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8 transition-all duration-300">
                        <h2 className="text-2xl font-black text-sky-800 ">
                            <i className={`fa-solid fa-school mr-3`}></i>
                            Baccalaureate Information
                        </h2>

                        <div className="space-y-6 pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div id="bac-field" className="space-y-2">
                                    <label className="block text-sm font-semibold text-sky-800">School Field</label>
                                    <div
                                        className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                            <span className="text-sky-900 font-medium">
                                                NaN
                                            </span>
                                    </div>
                                </div>
                                <div id="bac-grade" className="space-y-2">
                                    <label className="block text-sm font-semibold text-sky-800">BAC Grade</label>
                                    <div
                                        className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                            <span className="text-sky-900 font-medium">
                                                NaN
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
