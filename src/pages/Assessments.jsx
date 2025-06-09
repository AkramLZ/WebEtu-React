import React, { useEffect, useState } from 'react';
import { fetchAcademicYear, fetchDia, fetchAssessments } from '../services/api'; // Assuming you have an API service
import Sidebar from '../components/Sidebar';

const Assessments = () => {
    const [dia, setDia] = useState(null);
    const [assessmentsBySemester, setAssessmentsBySemester] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const year = await fetchAcademicYear();

                if (year && year.id) {
                    const diaData = await fetchDia(year.id);
                    setDia(diaData);

                    if (diaData && diaData.id) {
                        const assessmentsData = await fetchAssessments(diaData.id);

                        // Group assessments by semester
                        const groupedAssessments = assessmentsData.reduce((acc, assessment) => {
                            const semester = assessment.llPeriode;
                            if (!acc[semester]) {
                                acc[semester] = [];
                            }
                            acc[semester].push(assessment);
                            return acc;
                        }, {});
                        setAssessmentsBySemester(groupedAssessments);
                    } else {
                        setError("DIA data not found for the current academic year.");
                    }
                } else {
                    setError("Academic year not found.");
                }
            } catch (err) {
                console.error("Error fetching assessments:", err);
                setError("Failed to load assessments. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex bg-sky-50">
                <Sidebar dia={dia} />
                <main className="bg-sky-50 flex-1 p-8 ml-80 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-sky-800">Loading Assessments...</h1>
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
                <div id="dashboard-header" className="mb-8">
                    <h1 className="text-4xl font-black text-sky-800 mb-2">Assessments</h1>
                    <p className="text-sky-600">View your academic assessments by semester.</p>
                </div>

                <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-4">
                        {assessmentsBySemester && Object.keys(assessmentsBySemester).sort().map((semester) => (
                            <div key={semester} className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8">
                                <h2 className="text-2xl font-black text-sky-800 mb-6">
                                    <i className="fa-solid fa-graduation-cap mr-3"></i>
                                    {semester}
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {assessmentsBySemester[semester].map((assessment) => (
                                        <div key={assessment.id} className="bg-sky-50 rounded-xl p-5 border border-sky-200">
                                            <p className="text-lg font-semibold text-sky-900">
                                                {assessment['rattachementMcMcLibelleFr']}
                                            </p>
                                            <p className="text-sm text-sky-700 mt-1">
                                                <span className="font-medium">Grade:</span> <span className="font-bold text-sky-800">{assessment.note}</span>
                                            </p>
                                            <p className="text-xs text-sky-600">
                                                ({assessment['apCode']})
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {assessmentsBySemester && Object.keys(assessmentsBySemester).length === 0 && (
                    <p className="text-center text-sky-600 text-lg">No assessments found for this academic year.</p>
                )}
            </main>
        </div>
    );
};

export default Assessments;