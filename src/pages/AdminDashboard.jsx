import React, { useEffect, useState } from "react";
import { careersService } from "../lib/careersService";
import { FiDownload, FiExternalLink, FiRefreshCw } from "react-icons/fi";

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const docs = await careersService.getApplications();
            setApplications(docs);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch applications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        window.location.reload();
    };

    return (
        <section className="min-h-screen py-10 px-4 md:px-10 bg-gray-100 text-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Applications Dashboard</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchApplications}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            <FiRefreshCw /> Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p>Loading applications...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                ) : applications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-10 text-center">
                        <p className="text-gray-500 text-lg">No applications found yet.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Message</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {applications.map((app) => (
                                        <tr key={app.$id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {app.$createdAt ? new Date(app.$createdAt).toLocaleDateString() : "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{app.email}</div>
                                                <div className="text-sm text-gray-500">{app.phone || "-"}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <div className="max-h-20 overflow-y-auto pr-2">{app.message}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex flex-col gap-2">
                                                    {app.cvField && (
                                                        <a
                                                            href={careersService.getFileDownloadUrl(app.cvField)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
                                                        >
                                                            <FiDownload /> Download CV
                                                        </a>
                                                    )}
                                                    {app.coverLettterFieldId && (
                                                        <a
                                                            href={careersService.getFileDownloadUrl(app.coverLettterFieldId)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <FiExternalLink /> Cover Letter
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminDashboard;
