'use client';

import { motion } from 'framer-motion';

// Define sage green theme colors
const sageTheme = {
  light: '#A9BA9D', // Sage 400
  medium: '#8A9A7E', // Sage 500
  dark: '#6B7A5F', // Sage 600
};

export default function HelpPage() {
  const faqs = [
    {
      question: 'How does Synapse analyze mental health?',
      answer:
        'Synapse leverages advanced machine learning and natural language processing to evaluate text inputs, detecting patterns linked to mental health concerns. Our system is trained on vast clinical datasets, ensuring accuracy while adhering to rigorous privacy standards.',
    },
    {
      question: 'Is my data secure and private?',
      answer:
        'Absolutely. Privacy is our priority. All data is encrypted, anonymized, and processed in accordance with healthcare privacy regulations like HIPAA and GDPR. We never share personal details with third parties.',
    },
    {
      question: 'How accurate are the analyses?',
      answer:
        'Our analyses achieve high accuracy, validated through clinical trials and peer-reviewed studies. However, they are intended as supplementary insights and should complement, not replace, professional medical advice.',
    },
    {
      question: 'Can I get immediate help if needed?',
      answer:
        'Yes, if you’re in a mental health crisis, please contact emergency services or a helpline immediately. Synapse provides resources and contacts for urgent support, but we’re not a substitute for real-time intervention.',
    },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <main className="relative min-h-screen">
      {/* Seamless Background matching previous pages */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${sageTheme.light}20, ${sageTheme.dark}20 50%, transparent 80%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-10 pt-40 md:pt-48 lg:pt-56 relative z-10">
        {/* Header */}
        <motion.section variants={container} initial="hidden" animate="show" className="text-center mb-20">
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white bg-clip-text"
            style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
          >
            Help & Support
          </motion.h1>
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4"
          >
            Get answers to your questions and discover how to maximize Synapse’s mental health tools for your well-being.
          </motion.p>
        </motion.section>

        {/* Emergency Contact */}
        <motion.section variants={container} initial="hidden" animate="show" className="mb-20">
          <motion.div
            variants={item}
            className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-center mb-6">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
              >
                <svg
                  className="w-7 h-7"
                  style={{ color: sageTheme.light }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938-5.978A9 9 0 1112 21a9 9 0 01-6.938-15.978z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Need Immediate Help?</h2>
            </div>
            <p className="text-gray-300 mb-4">
              If you’re facing a mental health emergency, reach out to these resources right away:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">Emergency Services:</span> 911
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">National Crisis Hotline:</span> 988
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">Crisis Text Line:</span> Text HOME to 741741
              </li>
            </ul>
          </motion.div>
        </motion.section>

        {/* FAQs */}
        <motion.section variants={container} initial="hidden" animate="show" className="mb-20">
          <motion.div variants={item} className="flex items-center justify-center mb-10">
            <div
              className="p-3 rounded-full"
              style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
            >
              <svg
                className="w-7 h-7"
                style={{ color: sageTheme.light }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-white ml-4">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div variants={item} className="grid gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Support */}
        <motion.section variants={container} initial="hidden" animate="show" className="mb-20">
          <motion.div variants={item} className="flex items-center justify-center mb-10">
            <div
              className="p-3 rounded-full"
              style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
            >
              <svg
                className="w-7 h-7"
                style={{ color: sageTheme.light }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-white ml-4">Still Need Help?</h2>
          </motion.div>
          <motion.div
            variants={item}
            className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl text-center"
          >
            <p className="text-gray-300 mb-6">
              Our support team is here to assist with any questions or issues you might have.
            </p>
            <a
              href="mailto:support@synapse.com"
              className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-full hover:from-sage-600 hover:to-sage-700 transition-all"
              style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.medium}, ${sageTheme.dark})` }}
            >
              Contact Support
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}