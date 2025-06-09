import React, { useState, useEffect } from 'react';
import { fetchAcademicYear, fetchDia, fetchExamGrades, fetchPeriods } from '../services/api';
import Sidebar from '../components/Sidebar';

function ExamGrades() {
    const [dia, setDia] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupedGrades, setGroupedGrades] = useState(null);
    const [periods, setPeriods] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const loadExamGrades = async () => {
            try {
                setLoading(true);
                setError(null);

                const year = await fetchAcademicYear();

                if (year) {
                    const diaData = await fetchDia(year.id);
                    setDia(diaData);

                    if (diaData) {
                        const examData = await fetchExamGrades(diaData.id);

                        const periodData = await fetchPeriods(diaData['niveauId']);
                        const mappedPeriods = periodData.reduce((acc, period) => {
                            acc[period.id] = period;
                            return acc;
                        }, {});

                        if (periodData) {
                            const groupGradesByPeriod = (grades) => {
                                return grades.reduce((acc, grade) => {
                                    const periodId = grade['idPeriode'];
                                    const period = mappedPeriods[periodId];
                                    const periodName = period['libelleLongLt'];

                                    if (!acc[periodName]) {
                                        acc[periodName] = [];
                                    }
                                    acc[periodName].push(grade);
                                    return acc;
                                }, {});
                            };
                            const grouped = groupGradesByPeriod(examData);
                            setGroupedGrades(grouped);
                            setPeriods(Object.keys(grouped).sort());
                        }
                    }

                }
            } catch (err) {
                console.error("Error loading exam grades:", err);
                setError("Failed to load exam grades. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadExamGrades();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex bg-sky-50">
                <Sidebar dia={dia} />
                <main className="bg-sky-50 flex-1 p-8 ml-80 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-sky-800">Loading Exam Grades...</h1>
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
                    <h1 className="text-4xl font-black text-sky-800 mb-2">Exam Grades</h1>
                    <p className="text-sky-600">View your semesters exam grades.</p>
                </div>
                <div className="mb-8 flex flex-col items-center">
                    <p className="text-xl font-black text-sky-800 mb-2 mt-8">Pick a session:</p>
                    <div className="flex flex-row">
                        <button
                            className="flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-extrabold text-white bg-gradient-to-r from-[#0284c7] to-[#0369a1]"
                            onClick={() => setSession('session_1')}
                        >
                            Normal Session
                        </button>
                        <button
                            className="flex justify-center py-3 px-4 ml-6 border border-transparent rounded-lg shadow-sm text-md font-extrabold text-white bg-gradient-to-r from-[#0284c7] to-[#0369a1]"
                            onClick={() => setSession('session_2')}
                        >
                            Catch-Up Session
                        </button>
                    </div>
                </div>
                {session && (<div id="content-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {periods.map((period) => (
                            <div
                                className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8 transition-all duration-300">
                                <h2 className="text-2xl font-black text-sky-800 ">
                                    <i className={`fa-solid fa-graduation-cap mr-3`}></i>
                                    {period}
                                </h2>
                                <div className="space-y-6 pt-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        {groupedGrades[period].map((grade) => {
                                            if (grade['planningSessionIntitule'] === session) {
                                                return (
                                                    <div key={grade.id} className="bg-sky-50 rounded-xl p-5 border border-sky-200">
                                                        <p className="text-lg font-semibold text-sky-900">
                                                            {grade['mcLibelleFr']}
                                                        </p>
                                                        <p className="text-sm text-sky-700 mt-1">
                                                            <span className="font-medium">Grade: </span>
                                                            <span className="font-bold text-sky-800">{grade['noteExamen']}</span>
                                                        </p>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );

}

export default ExamGrades;