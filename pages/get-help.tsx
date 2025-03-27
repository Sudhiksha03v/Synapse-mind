'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GetHelp() {
  const faqs = [
    {
      question: "How does Synapse analyze mental health?",
      answer: "Synapse uses advanced machine learning algorithms and natural language processing to analyze text inputs and identify patterns related to mental health concerns. Our system is trained on extensive clinical data while maintaining strict privacy standards."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take privacy very seriously. All data is encrypted, anonymized, and processed in compliance with healthcare privacy standards. We never share personal information with third parties."
    },
    {
      question: "How accurate are the analyses?",
      answer: "Our system achieves high accuracy rates validated through clinical trials. However, results should be used as supportive information and not as a replacement for professional medical advice."
    },
    {
      question: "Can I get immediate help if needed?",
      answer: "If you're experiencing a mental health emergency, please contact emergency services or call the National Mental Health Helpline immediately. We provide resources and contacts for immediate professional help."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Help & Support
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/80 text-lg mb-8">
              Find answers to common questions and learn how to get the most out of Synapse's mental health analysis tools.
            </p>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 mb-12"
            >
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Need Immediate Help?</h2>
              <p className="text-foreground/90 mb-4">
                If you're experiencing a mental health emergency, please reach out to professional help immediately:
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Emergency Services:</span> 911
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">National Crisis Hotline:</span> 988
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Crisis Text Line:</span> Text HOME to 741741
                </li>
              </ul>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-semibold text-foreground">Frequently Asked Questions</h2>
              <div className="grid gap-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10"
                  >
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-foreground/80">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10"
            >
              <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
              <p className="text-foreground/80 mb-4">
                Our support team is available to assist you with any questions or concerns.
              </p>
              <a href="mailto:support@synapse.com" className="inline-flex items-center px-4 py-2 rounded-full text-white gradient-button">
                Contact Support
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 