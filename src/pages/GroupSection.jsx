import React, { useEffect, useState, useContext } from 'react';
import { fetchAcademicYear, fetchDia, fetchGroups } from '../services/api';
import Sidebar from '../components/Sidebar';

const GroupSection = () => {
    const [dia, setDia] = useState(null);
    const [groups, setGroups] = useState(null);
    const [groupComponent, setGroupComponent] = useState((<h1 className="text-3xl font-bold text-sky-800">Loading...</h1>));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const year = await fetchAcademicYear();

                if (year["id"]) {
                    const diaData = await fetchDia(year["id"]);
                    setDia(diaData);

                    if(diaData && diaData['id']) {
                        const groupsData = await fetchGroups(diaData['id']);
                        setGroupComponent(
                            <div id="content-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {groupsData.map((group) => (
                                <div className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8 transition-all duration-300">
                                    <h2 className="text-2xl font-black text-sky-800 ">
                                        <i className={`fa-solid fa-clock-four mr-3`}></i>
                                        {group["periodeLibelleLongLt"]}
                                    </h2>

                                    <div className="space-y-6 pt-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-sky-800">Section</label>
                                                <div className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                                    <span className="text-sky-900 font-medium">
                                                        {group["nomSection"]}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-sky-800">Group</label>
                                                <div className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                                                    <span className="text-sky-900 font-medium">
                                                        {group["nomGroupePedagogique"]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        );
                    }
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(() => {});
    }, []);

    return (
        <div className={`min-h-screen flex bg-sky-50`}>
            <Sidebar dia={dia} />

            <main className={`bg-sky-50 flex-1 p-8 ml-80`}>
                <div id="dashboard-header" className="mb-8">
                    <h1 className="text-4xl font-black text-sky-800 mb-2">Group & Section</h1>
                    <p className="text-sky-600">View your current group and section for this academic year.</p>
                </div>
                {groupComponent}
            </main>
        </div>
    );
};

export default GroupSection;