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

    return (
        <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#134E4A" }}>Applications</h1>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        Job applications submitted through the Careers page.
                    </p>
                </div>
                <button onClick={fetchApplications} className="btn-secondary inline-flex items-center gap-2">
                    <FiRefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>

            {loading ? (
                <p style={{ color: "var(--text-secondary)" }}>Loading applications...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : applications.length === 0 ? (
                <div
                    className="rounded-2xl p-10 text-center"
                    style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}
                >
                    <p style={{ color: "var(--text-secondary)" }}>No applications found yet.</p>
                </div>
            ) : (
                <div className="card overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b" style={{ borderColor: "var(--border-color)" }}>
                                <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Date</th>
                                <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Name</th>
                                <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Contact</th>
                                <th className="p-4 text-sm font-semibold w-1/3" style={{ color: "var(--text-secondary)" }}>Message</th>
                                <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Documents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.$id} className="border-b last:border-0" style={{ borderColor: "var(--border-color)" }}>
                                    <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                        {app.$createdAt ? new Date(app.$createdAt).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="p-4 font-medium" style={{ color: "var(--text-primary)" }}>{app.name}</td>
                                    <td className="p-4">
                                        <div className="text-sm" style={{ color: "var(--text-primary)" }}>{app.email}</div>
                                        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{app.phone || "-"}</div>
                                    </td>
                                    <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                        <div className="max-h-20 overflow-y-auto pr-2">{app.message}</div>
                                    </td>
                                    <td className="p-4 text-sm font-medium">
                                        <div className="flex flex-col gap-2">
                                            {app.cvField && (
                                                <a
                                                    href={careersService.getFileDownloadUrl(app.cvField)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5"
                                                    style={{ color: "var(--primary)" }}
                                                >
                                                    <FiDownload className="w-3.5 h-3.5" /> Download CV
                                                </a>
                                            )}
                                            {app.coverLettterFieldId && (
                                                <a
                                                    href={careersService.getFileDownloadUrl(app.coverLettterFieldId)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5"
                                                    style={{ color: "var(--primary)" }}
                                                >
                                                    <FiExternalLink className="w-3.5 h-3.5" /> Cover Letter
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
