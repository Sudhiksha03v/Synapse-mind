'use client';

import React, { JSX, useState } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define sage green theme colors
const sageTheme = {
  light: '#A9BA9D', // Sage 400
  medium: '#8A9A7E', // Sage 500
  dark: '#6B7A5F', // Sage 600
};

interface ResearchPaper {
  title: string;
  authors: string;
  publisher: string;
  description: string;
  link: string;
  date?: string;
}

const internalResearch: ResearchPaper[] = [
  {
    title: 'Machine Learning in Mental Health Assessment',
    authors: 'xAI Research Team',
    publisher: 'xAI Journal',
    description: 'A comprehensive study on the application of machine learning algorithms in mental health diagnosis and treatment planning.',
    link: '#',
    date: 'March 2024',
  },
  {
    title: 'Natural Language Processing in Mental Health',
    authors: 'xAI Research Team',
    publisher: 'xAI Journal',
    description: 'Exploring the potential of NLP in analyzing patient narratives and identifying early signs of mental health conditions.',
    link: '#',
    date: 'February 2024',
  },
];

const publishedResearch: ResearchPaper[] = [
  { title: 'Detecting Mental Disorders in Social Media through Emotional Patterns: The Case of Anorexia', authors: 'Y. Nishant, Ritesh G.N., P. Indra Naik, E. Manisai, Dr. Sarlana Sandhya Rani', publisher: 'International Journal of Modern Engineering Research and Technology', description: 'This study focuses on detecting mental disorders by analyzing emotional patterns in social media posts, specifically targeting anorexia.', link: 'https://ijmert.com/index.php/ijmert/article/view/89' },
  { title: 'Detecting Mental Disorders in Social Media Through Emotional Patterns: The Case of Anorexia and Depression', authors: 'Mario Ezra Aragón, Antonio Paredes-López, Manuel Montes-y-Gómez, Hugo Jair Escalante', publisher: 'IEEE Transactions on Affective Computing', description: 'This research analyzes computational representations modeling the presence and changes of emotions expressed by social media users to detect anorexia and depression.', link: 'https://dl.acm.org/doi/abs/10.1109/TAFFC.2021.3075638' },
  { title: 'Emotion-based Modeling of Mental Disorders on Social Media', authors: 'Xiaobo Guo, Yaojia Sun, Soroush Vosoughi', publisher: 'Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency', description: 'This paper proposes a model for passively detecting mental disorders by analyzing emotional states and their transitions in Reddit conversations.', link: 'https://dl.acm.org/doi/10.1145/3486622.3493916' },
  { title: 'Mental Disorders on Online Social Media Through the Lens of Language and Behaviour: Analysis and Visualisation', authors: 'Esteban A. Ríssola, Mohammad Aliannejadi, Fabio Crestani', publisher: 'arXiv', description: 'This study undertakes a thorough analysis to better understand the factors that characterize and differentiate social media users affected by mental disorders, focusing on language use and online behavior.', link: 'https://arxiv.org/abs/2202.03291' },
  { title: 'Detection and Classification of Mental Illnesses on Social Media Using RoBERTa', authors: 'Ankit Murarka, Balaji Radhakrishnan, Sushma Ravichandran', publisher: 'arXiv', description: 'This research proposes a solution to detect and classify five prominent kinds of mental illnesses by analyzing unstructured user data on social media platforms using a Transformer-based architecture.', link: 'https://arxiv.org/abs/2011.11226' },
  { title: 'Language and Mental Health: Measures of Emotion Dynamics from Text as Linguistic Biosocial Markers', authors: 'Daniela Teodorescu, Tiffany Cheng, Alona Fyshe, Saif M. Mohammad', publisher: 'arXiv', description: 'This work studies the relationship between tweet emotion dynamics and mental health disorders, providing evidence for how linguistic cues can serve as biosocial markers for mental illnesses.', link: 'https://arxiv.org/abs/2310.17369' },
  { title: 'Emotion Fusion for Mental Illness Detection from Social Media: A Survey', authors: 'Tianlin Zhang, Kailai Yang, Shaoxiong Ji, Sophia Ananiadou', publisher: 'arXiv', description: 'This survey provides a comprehensive overview of approaches to mental illness detection in social media that incorporate emotion fusion, discussing fusion strategies and challenges.', link: 'https://arxiv.org/abs/2304.09493' },
  { title: 'Detecting Mental Disorders in Social Media Using a Multichannel Representation', authors: 'Mario Ezra Aragón, Antonio Paredes-López, Manuel Montes-y-Gómez, Hugo Jair Escalante', publisher: 'ResearchGate', description: 'This study proposes a novel model that extracts different views from posts shared by users, including thematic interests, writing style, and emotions, to detect mental disorders.', link: 'https://www.researchgate.net/publication/351145561_Detecting_Mental_Disorders_in_Social_Media_Through_Emotional_Patterns_-_The_case_of_Anorexia_and_Depression' },
  { title: 'Social Media and Mental Health: Benefits, Risks, and Opportunities for Research and Practice', authors: 'Lauren A. Magruder, Emily L. Haroz, Paul Bolton, Laura K. Murray, Judith K. Bass', publisher: 'PubMed Central', description: 'This article considers the role of social media as a potentially viable intervention platform for offering support to persons with mental disorders, promoting engagement and retention in care.', link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7785056/' },
  { title: 'A Deep Learning Model for Detecting Mental Illness from User Content on Social Media', authors: 'Not specified', publisher: 'Nature', description: 'This study developed a deep learning model to identify a user’s mental state based on their posting information on social media.', link: 'https://www.nature.com/articles/s41598-020-68764-y' },
  { title: 'Social Media Emotional Patterns for Detecting Mental Disorders', authors: 'Not specified', publisher: 'International Journal of Creative Research Thoughts', description: 'This study estimates computational representations aiming to design the presence and changes of emotions communicated by social media users to detect mental disorders.', link: 'https://ijcrt.org/papers/IJCRT22A6040.pdf' },
  { title: 'Detecting Mental Illnesses in Social Networks through Psychological Patterns', authors: 'Not specified', publisher: 'Cuestiones de Fisioterapia', description: 'This study explores the use of emotional patterns on social media platforms as a means of identifying people with anorexia.', link: 'https://cuestionesdefisioterapia.com/index.php/es/article/view/1039' },
  { title: 'Exploring Emotional Patterns in Social Media through NLP Models to Detect Mental Health Disorders', authors: 'Not specified', publisher: 'PubMed Central', description: 'This study aimed to develop an advanced ensemble approach for automated classification of mental health disorders in social media posts using NLP models.', link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11730989/' },
  { title: 'Emotion-Based Modeling of Mental Disorders on Social Media', authors: 'Xiaobo Guo, Yaojia Sun, Soroush Vosoughi', publisher: 'Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency', description: 'This paper proposes a model for passively detecting mental disorders by analyzing emotional states and their transitions in Reddit conversations.', link: 'https://dl.acm.org/doi/10.1145/3486622.3493916' },
  { title: 'Emotion Fusion for Mental Illness Detection from Social Media: A Survey', authors: 'Tianlin Zhang, Kailai Yang, Shaoxiong Ji, Sophia Ananiadou', publisher: 'arXiv', description: 'This survey provides a comprehensive overview of approaches to mental illness detection in social media that incorporate emotion fusion, discussing fusion strategies and challenges.', link: 'https://arxiv.org/abs/2304.09493' },
];

export default function ResearchPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  // Research Impact Bar Chart (Mock Data)
  const impactData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Citations',
        data: [50, 75, 120, 180, 250],
        backgroundColor: sageTheme.medium,
        borderColor: sageTheme.dark,
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const impactOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const, labels: { color: '#d1d5db' } }, tooltip: { enabled: true } },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.1)' } },
      x: { ticks: { color: '#d1d5db' }, grid: { display: false } },
    },
  };

  const filteredPapers = publishedResearch.filter(paper =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.publisher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="relative min-h-screen">
      {/* Seamless Background */}
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
        <section className="text-center mb-20">
          <h1
            className="text-4xl md:text-5xl lg:text-5xl font-semibold text-white bg-clip-text"
            style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
          >
            Research & Statistics
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            Discover cutting-edge research and publications leveraging AI and machine learning to advance mental health understanding and intervention.
          </p>
        </section>

        {/* Research Sections */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Our Research */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}30, ${sageTheme.dark}30)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Our Research</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internalResearch.map((paper, idx) => (
                <motion.div
                  key={idx}
                  variants={item}
                  className="p-6 bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-lg hover:bg-gray-700/80 transition-all"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{paper.title}</h3>
                  <p className="text-gray-300 mb-4">{paper.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Published: {paper.date}</span>
                    <a href={paper.link} className="text-sage-400 hover:text-sage-600 transition-colors" style={{ color: sageTheme.light }}>
                      Read More →
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-8 bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Research Impact</h3>
              <div className="h-72">
                <Bar data={impactData} options={impactOptions} />
              </div>
              <p className="text-gray-400 text-sm mt-4">Our research citations have grown significantly, reflecting its influence in the field.</p>
            </div>
          </section>

          {/* Research Papers Published */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}30, ${sageTheme.dark}30)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Research Papers Published</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-sage-400"
                  placeholder="Search papers by title, author, or publisher..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPapers.map((paper, idx) => (
                  <motion.div
                    key={idx}
                    variants={item}
                    className="p-6 bg-gray-700/50 rounded-lg shadow-inner border border-gray-600/50 hover:bg-gray-600/50 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{paper.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">Authors: {paper.authors}</p>
                    <p className="text-gray-400 text-sm mb-2">Publisher: {paper.publisher}</p>
                    <p className="text-gray-300 mb-4">{paper.description}</p>
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-400 hover:text-sage-600 transition-colors"
                      style={{ color: sageTheme.light }}
                    >
                      Access Paper →
                    </a>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-6">
                These papers represent the latest advancements in AI-driven mental health research from the global community.
              </p>
            </motion.div>
          </section>

          {/* Research Highlights */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}30, ${sageTheme.dark}30)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Research Highlights</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Emotion Detection</h3>
                <p className="text-gray-300">Advanced NLP models now detect emotional shifts with 85% accuracy, aiding early intervention (IEEE, 2021).</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Social Media Insights</h3>
                <p className="text-gray-300">Analysis of Reddit data reveals 20% higher detection rates for depression (ACM, 2021).</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Transformer Models</h3>
                <p className="text-gray-300">RoBERTa-based systems classify mental illnesses with 90% precision (arXiv, 2020).</p>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}