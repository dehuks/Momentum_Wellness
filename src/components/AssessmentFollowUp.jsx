import React, { useState } from 'react';
import { FiPhone, FiLock, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { sendEmail, formatAssessmentResult } from '../utils/emailService';
import { getWhatsAppUrl } from '../pages/WhatsappConfig';

const HELPLINE_TEL = '+254708046101';
const HELPLINE_LABEL = '0708 046 101';

/**
 * Shown under every self-assessment result. Nothing is sent to Mowet unless the
 * person fills in this form; sharing the result itself is a separate opt-in.
 *
 * concerning — score suggests they should talk to someone; promotes call/WhatsApp
 * urgent     — signs of self-harm risk; shows immediate-help message first
 */
const AssessmentFollowUp = ({ testName, emailTitle, scoreData, interpretation, concerning = false, urgent = false }) => {
    const [form, setForm] = useState({ name: '', contact: '', shareResult: false });
    const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

    const whatsappUrl = getWhatsAppUrl(
        `Hello Mowet Kenya, I've just taken the ${testName} self-check on your website and would like to talk to someone.`
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const message = [
            'Contact request from a website self-check.',
            '',
            form.shareResult
                ? formatAssessmentResult(testName, scoreData, interpretation)
                : `Test taken: ${testName}\n(The person chose not to share their result.)`,
        ].join('\n');

        try {
            await sendEmail({
                name: form.name,
                email: form.contact.includes('@') ? form.contact : 'Not provided',
                phone: form.contact,
                message,
                title: `${emailTitle} – contact request`,
            });
            setStatus('sent');
        } catch (error) {
            console.error('Failed to send contact request', error);
            setStatus('error');
        }
    };

    return (
        <div className="space-y-6 text-left max-w-2xl mx-auto">
            {urgent && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-900" role="alert">
                    <div className="flex items-start gap-3">
                        <FiAlertTriangle className="shrink-0 mt-1" aria-hidden="true" />
                        <div className="space-y-2 text-sm">
                            <p className="font-bold text-base">You don't have to go through this alone.</p>
                            <p>
                                You mentioned thoughts of being better off dead or of hurting yourself. Please talk to
                                someone today. Our team is available 24/7 on{' '}
                                <a href={`tel:${HELPLINE_TEL}`} className="font-bold underline">{HELPLINE_LABEL}</a>.
                            </p>
                            <p>
                                If you are in immediate danger, call the Kenya Red Cross toll-free line on{' '}
                                <a href="tel:1199" className="font-bold underline">1199</a> or go to the nearest hospital.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {(concerning || urgent) && (
                <div className="rounded-xl border border-[var(--border-color)] p-5" style={{ background: 'var(--gradient-accent)' }}>
                    <p className="font-bold text-[#134E4A] mb-1">Talk to someone today</p>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                        Your result suggests it could really help to speak with a professional. Our team is available 24/7.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a href={`tel:${HELPLINE_TEL}`} className="btn-primary justify-center">
                            <FiPhone aria-hidden="true" /> Call {HELPLINE_LABEL}
                        </a>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary justify-center">
                            <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            )}

            <div className="rounded-xl border border-[var(--border-color)] bg-white p-5 md:p-6">
                {status === 'sent' ? (
                    <div className="flex items-start gap-3 text-[#134E4A]">
                        <FiCheckCircle className="shrink-0 mt-1 text-[var(--primary)]" aria-hidden="true" />
                        <div>
                            <p className="font-bold">Thank you, {form.name.split(' ')[0]}.</p>
                            <p className="text-sm text-[var(--text-secondary)]">
                                A member of our team will contact you confidentially.
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p className="font-bold text-[#134E4A]">Would you like a counsellor to reach out?</p>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Optional. Leave your details and we'll contact you confidentially.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="followup-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    id="followup-name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="w-full p-3 border rounded-lg outline-none focus:border-[var(--primary)] bg-gray-50"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="followup-contact" className="block text-sm font-medium text-gray-700 mb-1">Phone or email</label>
                                <input
                                    id="followup-contact"
                                    type="text"
                                    required
                                    className="w-full p-3 border rounded-lg outline-none focus:border-[var(--primary)] bg-gray-50"
                                    placeholder="e.g. 0712… or you@example.com"
                                    value={form.contact}
                                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)] cursor-pointer">
                            <input
                                type="checkbox"
                                className="mt-1 accent-[var(--primary)]"
                                checked={form.shareResult}
                                onChange={(e) => setForm({ ...form, shareResult: e.target.checked })}
                            />
                            <span>Also share my result, so the counsellor understands what I'm going through.</span>
                        </label>

                        {status === 'error' && (
                            <p className="text-sm text-red-600">
                                Sorry, we couldn't send your request. Please call us on{' '}
                                <a href={`tel:${HELPLINE_TEL}`} className="font-semibold underline">{HELPLINE_LABEL}</a> instead.
                            </p>
                        )}

                        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                            {status === 'sending' ? 'Sending…' : 'Request a call back'}
                        </button>
                    </form>
                )}
            </div>

            <p className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <FiLock className="shrink-0 mt-0.5" aria-hidden="true" />
                Your answers have not been sent anywhere. We only receive what you choose to submit in the form above.
            </p>
        </div>
    );
};

export default AssessmentFollowUp;
