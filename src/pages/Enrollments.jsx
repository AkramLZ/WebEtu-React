import React, {useEffect, useState} from "react";
import {fetchAcademicYear, fetchDias} from "../services/api.js";
import Sidebar from "../components/Sidebar.jsx";

function Enrollments() {
    const [dias, setDias] = useState([]);
    const [dia, setDia] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEnrollments = async () => {
            setLoading(true);
            const year = await fetchAcademicYear();

            if (year) {
                const diasData = await fetchDias();
                setDias(diasData);
                setDia(diasData[0]);
            } else {
                setError("Failed to load current academic year");
            }

            setLoading(false);

        }

        loadEnrollments().then(() => {
        });
    }, []);



    if (loading) {
        return (
            <div className="min-h-screen flex bg-sky-50">
                <Sidebar dia={dia} />
                <main className="bg-sky-50 flex-1 p-8 ml-80 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-sky-800">Loading Enrollments...</h1>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex bg-sky-50">
                <Sidebar dia={dia} />
                <main className="bg-sky-50 flex-1 p-8 ml-80 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-red-600">{error}</h1>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-sky-50">
            <Sidebar dia={dia} />

            <main className="bg-sky-50 flex-1 p-8 ml-80">
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-sky-800 mb-2">Enrollments</h1>
                    <p className="text-sky-600">View which majors you've been enrolled in.</p>
                </div>

                <div className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {dias.map((dia, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8 ml-4">
                                <h2 className="text-2xl font-black text-sky-800 mb-6">
                                    <i className="fa-solid fa-graduation-cap mr-3"></i>
                                    {dia['anneeAcademiqueCode']}
                                </h2>
                                <div className="flex justify-between items-center p-3 mb-2">
                                    <span className="text-sm font-semibold text-sky-800">Cycle</span>
                                    <span className="text-sky-900 font-medium">{dia['refLibelleCycle']}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 mb-2">
                                    <span className="text-sm font-semibold text-sky-800">Level</span>
                                    <span className="text-sky-900 font-medium">{dia['niveauLibelleLongLt']}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 mb-2">
                                    <span className="text-sm font-semibold text-sky-800">Field</span>
                                    <span className="text-sky-900 font-medium">{dia['ofLlDomaine']}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 mb-2">
                                    <span className="text-sm font-semibold text-sky-800">Major</span>
                                    <span className="text-sky-900 font-medium">{dia['ofLlFiliere']}</span>
                                </div>
                                {dia['ofLlSpecialite'] ? (
                                    <div className="flex justify-between items-center p-3 mb-2">
                                        <span className="text-sm font-semibold text-sky-800">Speciality</span>
                                        <span className="text-sky-900 font-medium">{dia['ofLlSpecialite']}</span>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Enrollments;