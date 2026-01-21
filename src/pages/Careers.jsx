import React, { useState, useRef } from "react";
import { FiUpload, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { careersService } from "../lib/careersService";
import cnta from "../assets/contact.png"; // Using same image for now or we could use another one if available

const Careers = () => {
    const formRef = useRef();
    const fileInputRefCV = useRef();
    const fileInputRefCL = useRef();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [files, setFiles] = useState({
        cv: null,
        coverLetter: null
    });

    const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB Limit
                alert("File size exceeds 5MB limit.");
                e.target.value = ""; // Reset
                return;
            }
            setFiles((prev) => ({ ...prev, [type]: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.name || !formData.email || !formData.message || !files.cv) {
            setStatus("error");
            setErrorMessage("Please fill in all required fields and upload your CV.");
            return;
        }

        setStatus("submitting");
        setErrorMessage("");

        try {
            await careersService.submitApplication(formData, files.cv, files.coverLetter);

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
            setFiles({ cv: null, coverLetter: null });
            if (fileInputRefCV.current) fileInputRefCV.current.value = "";
            if (fileInputRefCL.current) fileInputRefCL.current.value = "";

        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage("Failed to submit application. Please try again later.");
        }
    };

    return (
        <section
            className="py-16 px-4 md:px-10 lg:px-20"
            style={{ backgroundColor: "var(--light-bg)", color: "var(--text-primary)" }}
        >
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="section-title">Work With Us</h2>
                <p className="page-description">
                    Join our team and help us make a difference in mental wellness.
                    We are looking for passionate individuals to join our mission.
                </p>
            </div>

            <div className="max-w-3xl mx-auto card">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                    Job Application
                </h3>

                {status === "success" && (
                    <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800 flex items-center gap-3">
                        <FiCheckCircle className="text-xl" />
                        <div>
                            <p className="font-semibold">Application Received!</p>
                            <p className="text-sm">Thank you for applying. We will review your application and get back to you soon.</p>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800 flex items-center gap-3">
                        <FiAlertCircle className="text-xl" />
                        <div>
                            <p className="font-semibold">Submission Failed</p>
                            <p className="text-sm">{errorMessage}</p>
                        </div>
                    </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="form-label" htmlFor="name">Name <span className="text-red-500">*</span></label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            disabled={status === "submitting"}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="form-label" htmlFor="email">Email <span className="text-red-500">*</span></label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            disabled={status === "submitting"}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="form-label" htmlFor="phone">Phone <span className="text-sm text-gray-400">(Optional)</span></label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="0700 000 000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            disabled={status === "submitting"}
                        />
                    </div>

                    {/* CV Upload */}
                    <div>
                        <label className="form-label" htmlFor="cv">Upload CV (PDF/Doc) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                id="cv"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                ref={fileInputRefCV}
                                onChange={(e) => handleFileChange(e, 'cv')}
                                className="hidden"
                                disabled={status === "submitting"}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRefCV.current.click()}
                                className="form-input w-full text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <span className={files.cv ? "text-gray-800" : "text-gray-400"}>
                                    {files.cv ? files.cv.name : "Choose file..."}
                                </span>
                                <FiUpload className="text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Cover Letter Upload */}
                    <div>
                        <label className="form-label" htmlFor="coverLetter">Cover Letter <span className="text-sm text-gray-400">(Optional)</span></label>
                        <div className="relative">
                            <input
                                id="coverLetter"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                ref={fileInputRefCL}
                                onChange={(e) => handleFileChange(e, 'coverLetter')}
                                className="hidden"
                                disabled={status === "submitting"}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRefCL.current.click()}
                                className="form-input w-full text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <span className={files.coverLetter ? "text-gray-800" : "text-gray-400"}>
                                    {files.coverLetter ? files.coverLetter.name : "Choose file..."}
                                </span>
                                <FiUpload className="text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="form-label" htmlFor="message">Message / Introduction <span className="text-red-500">*</span></label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Tell us a bit about yourself..."
                            value={formData.message}
                            onChange={handleChange}
                            className="form-input form-textarea"
                            rows="5"
                            disabled={status === "submitting"}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn-primary btn-large w-full"
                        disabled={status === "submitting"}
                        style={{ opacity: status === "submitting" ? 0.7 : 1 }}
                    >
                        {status === "submitting" ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Careers;
