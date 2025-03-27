'use client';

import { motion } from 'framer-motion';

export default function ResearchPage() {
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
            Research & Publications
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/80 text-lg mb-8">
              Explore our latest research findings and publications in mental health analysis using machine learning and artificial intelligence.
            </p>

            <div className="grid gap-8 mt-12">
              {/* Research Paper 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-3">Machine Learning in Mental Health Assessment</h3>
                <p className="text-foreground/80 mb-4">
                  A comprehensive study on the application of machine learning algorithms in mental health diagnosis and treatment planning.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-foreground/60">Published: March 2024</span>
                  <a href="#" className="text-primary hover:text-accent transition-colors">Read More →</a>
                </div>
              </motion.div>

              {/* Research Paper 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-3">Natural Language Processing in Mental Health</h3>
                <p className="text-foreground/80 mb-4">
                  Exploring the potential of NLP in analyzing patient narratives and identifying early signs of mental health conditions.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-foreground/60">Published: February 2024</span>
                  <a href="#" className="text-primary hover:text-accent transition-colors">Read More →</a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 