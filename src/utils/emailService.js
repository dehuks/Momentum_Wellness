import emailjs from '@emailjs/browser';

/**
 * Sends an email using EmailJS
 * @param {Object} params - The parameters to send in the email (must match template variables)
 * @returns {Promise} - The EmailJS response
 */
export const sendEmail = async (params) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS configuration missing");
        throw new Error("EmailJS configuration missing");
    }

    try {
        const response = await emailjs.send(serviceId, templateId, params, publicKey);
        return response;
    } catch (error) {
        console.error("EmailJS Send Error:", error);
        throw error;
    }
};

/**
 * Formats assessment results into a readable message string
 * @param {string} testName - Name of the test (e.g., "Beck's Anxiety Inventory")
 * @param {Object} scoreData - The score object or value
 * @param {string} interpretation - The interpretation text
 * @returns {string} - Formatted message string
 */
export const formatAssessmentResult = (testName, scoreData, interpretation) => {
    let scoreText = "";

    if (typeof scoreData === 'object') {
        // For things like Burnout which might have multiple scores
        scoreText = Object.entries(scoreData)
            .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
            .join(', ');
    } else {
        scoreText = `Score: ${scoreData}`;
    }

    return `
New Assessment Submission

Test: ${testName}
${scoreText}
Interpretation: ${interpretation}

Date: ${new Date().toLocaleString()}
  `.trim();
};
