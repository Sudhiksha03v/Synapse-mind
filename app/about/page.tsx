'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
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
            About Synapse
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/80 text-lg mb-8">
              Synapse is at the forefront of revolutionizing mental health analysis through advanced machine learning and artificial intelligence.
            </p>

            <div className="grid gap-12 mt-12">
              {/* Mission Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-semibold text-foreground">Our Mission</h2>
                <p className="text-foreground/80">
                  We strive to make mental health analysis more accessible, accurate, and actionable through innovative technology. Our goal is to support both individuals and healthcare professionals in understanding and addressing mental health concerns.
                </p>
              </motion.div>

              {/* Team Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-semibold text-foreground">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                    <h3 className="text-xl font-semibold mb-2">Dr. Sarah Chen</h3>
                    <p className="text-foreground/80">Lead AI Researcher</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                    <h3 className="text-xl font-semibold mb-2">Dr. Michael Patel</h3>
                    <p className="text-foreground/80">Mental Health Specialist</p>
                  </div>
                </div>
              </motion.div>

              {/* Technology Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-semibold text-foreground">Our Technology</h2>
                <p className="text-foreground/80">
                  We combine state-of-the-art machine learning models with clinical expertise to provide accurate and reliable mental health analysis. Our platform uses natural language processing and advanced pattern recognition to identify potential mental health concerns and provide personalized recommendations.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 