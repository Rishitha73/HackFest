const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Degree = require('../models/Degree');
const Branch = require('../models/Branch');
const Course = require('../models/Course');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/academic-roadmap');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Degree.deleteMany({});
    await Branch.deleteMany({});
    await Course.deleteMany({});

    console.log('Seeding degrees and branches for pre-university students...\n');

    // Create degrees with branches
    const degreesData = [
      {
        name: 'Bachelor of Science (B.Sc) - Physics',
        description: 'A 3-year rigorous program exploring fundamental physics concepts and theories',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Theoretical Physics',
            overview: 'Explore quantum mechanics, relativity, and the fundamental laws of nature',
            detailedDescription: 'Theoretical Physics is the branch of physics that employs mathematical models and abstractions to explain and predict natural phenomena. This specialization delves into the most fundamental questions about the universe, from the behavior of subatomic particles to the structure of spacetime itself. Students engage with cutting-edge theories including quantum field theory, string theory, and cosmology. The curriculum emphasizes rigorous mathematical training alongside conceptual understanding, preparing students for careers in research, data science, and quantitative analysis. Theoretical physicists work on problems ranging from the early universe to quantum computing, often collaborating with experimental physicists to test predictions.',
            whatYouLearn: [
              'Quantum Mechanics and Field Theory - Understanding particle behavior at microscopic scales',
              'General Relativity and Cosmology - Study of spacetime, black holes, and the universe',
              'Statistical Mechanics - Linking microscopic and macroscopic physical properties',
              'Mathematical Physics and Advanced Calculus - Tools for theoretical analysis',
              'Particle Physics and Standard Model - Fundamental forces and elementary particles',
              'Computational Methods - Numerical techniques for solving complex equations',
              'Classical Mechanics - Lagrangian and Hamiltonian formulations',
              'Symmetries and Conservation Laws - Fundamental principles in physics'
            ],
            jobProspects: [
              'Research Scientist in Universities and National Labs (CERN, NASA, ISRO)',
              'Data Scientist with Physics Background in Tech Companies',
              'Quantitative Analyst in Finance and Trading Firms',
              'Scientific Consultant for Technology Companies',
              'AI/ML Engineer focusing on Physical Systems',
              'Academic Professor and Researcher',
              'Science Policy Advisor for Government Organizations'
            ],
            eligibility: '10+2 with Physics and Mathematics (minimum 75% aggregate)',
            prerequisites: [
              'Strong foundation in calculus and linear algebra',
              'Solid understanding of classical mechanics',
              'Proficiency in problem-solving and abstract thinking',
              'Basic programming skills (Python/C++ recommended)',
              'Passion for understanding fundamental questions about nature'
            ],
            careerGrowth: 'Career progression typically starts with PhD programs at top universities (5-6 years), followed by postdoctoral research positions (2-4 years). Successful researchers can become faculty members, principal investigators, or transition to industry roles. In finance and tech, physicists often start as analysts and can progress to senior quantitative roles, with many reaching director-level positions within 10-15 years.',
            industryTrends: 'Growing demand for theoretical physicists in quantum computing companies, AI research labs, and financial institutions. The field of quantum information science is experiencing explosive growth. Machine learning and data science have become major career paths for physics graduates. Interdisciplinary research combining physics with biology, chemistry, and computer science is increasingly common.',
            averageSalary: 'Entry: ₹4-6 LPA (Academia/Research), ₹8-15 LPA (Tech/Finance) | Mid-level: ₹12-25 LPA | Senior: ₹30-60 LPA+ in industry',
            topRecruiters: [
              'CERN (European Organization for Nuclear Research)',
              'NASA, ISRO, DRDO',
              'Google, Microsoft, IBM Research',
              'Goldman Sachs, Morgan Stanley, Jane Street',
              'D.E. Shaw, Citadel, Two Sigma',
              'IITs, IISc, TIFR, IMSc',
              'Quantum Computing Startups (IonQ, Rigetti, PsiQuantum)'
            ],
            skills: [
              'Advanced Mathematics and Differential Equations',
              'Programming (Python, C++, MATLAB, Mathematica)',
              'Analytical and Critical Thinking',
              'Research Methodology and Scientific Writing',
              'Data Analysis and Visualization',
              'Problem-solving in Abstract Contexts',
              'Collaboration and Communication'
            ],
            trialTasks: [
              'Read about Schrödinger\'s Cat thought experiment and write your interpretation',
              'Watch a documentary on quantum mechanics (e.g., "The Quantum Revolution" or Brian Cox series)',
              'Solve 5 calculus problems involving partial derivatives and differential equations',
              'Explore career paths of famous theoretical physicists like Feynman, Hawking, or Witten',
              'Write a 500-word summary of Einstein\'s theory of general relativity',
              'Try online physics simulations at PhET Interactive Simulations',
              'Join a physics discussion forum or subreddit and ask a question about quantum mechanics'
            ]
          },
          {
            name: 'Applied Physics',
            overview: 'Apply physics principles to solve real-world engineering and technological problems',
            detailedDescription: 'Applied Physics bridges the gap between theoretical physics and practical engineering applications. This specialization focuses on using physics principles to develop new technologies and solve real-world problems in industries ranging from telecommunications to renewable energy. Students learn to work with advanced instrumentation, design experiments, and translate physical concepts into tangible solutions. The field encompasses semiconductor technology, photonics, materials science, and nanotechnology. Applied physicists often collaborate with engineers and chemists, making it an interdisciplinary field with diverse career opportunities in both research and industry.',
            whatYouLearn: [
              'Electronics and Semiconductor Physics - Transistors, integrated circuits, and device physics',
              'Optics and Photonics - Lasers, fiber optics, and optical communication systems',
              'Materials Science - Properties and applications of advanced materials',
              'Computational Physics and Simulations - Modeling physical systems using software',
              'Nanotechnology and Nanomaterials - Physics at the nanoscale',
              'Instrumentation and Measurement Techniques - Designing and using scientific instruments',
              'Renewable Energy Physics - Solar cells, energy storage, and conversion',
              'Condensed Matter Physics - Study of solid and liquid matter'
            ],
            jobProspects: [
              'Electronics Engineer in Semiconductor Companies',
              'Materials Scientist in R&D Laboratories',
              'Optical Engineer in Telecommunications',
              'Research & Development Engineer in Tech Companies',
              'Nanotechnology Researcher',
              'Solar Energy Specialist',
              'Product Development Engineer',
              'Quality Assurance Engineer in Manufacturing'
            ],
            eligibility: '10+2 with Physics and Mathematics (minimum 70% aggregate)',
            prerequisites: [
              'Strong understanding of electricity and magnetism',
              'Basic knowledge of circuits and electronics',
              'Programming skills (Python, C, or MATLAB)',
              'Laboratory skills and experimental techniques',
              'Interest in hands-on problem solving'
            ],
            careerGrowth: 'Graduates can start as junior engineers or research assistants in industry or research institutions. With 3-5 years experience, progression to senior engineer or team lead positions is common. Many pursue MS or PhD programs to specialize further, which opens doors to leadership roles in R&D. Industry professionals can reach principal engineer or technical director positions within 10-12 years.',
            industryTrends: 'Explosive growth in quantum technology and quantum computing hardware. Renewable energy sector expanding rapidly, especially solar and battery technology. Semiconductor industry booming with global chip shortage driving investment. Photonics and optical computing gaining attention as alternatives to traditional electronics. Nanotechnology applications in medicine, materials, and electronics.',
            averageSalary: 'Entry: ₹5-9 LPA | Mid-level: ₹12-22 LPA | Senior: ₹25-50 LPA | Principal Engineer: ₹50 LPA+',
            topRecruiters: [
              'Intel, AMD, NVIDIA, Qualcomm',
              'Samsung, Texas Instruments, Broadcom',
              'IBM, Microsoft, Google (Hardware)',
              'ISRO, DRDO, Bharat Electronics Limited (BEL)',
              'Tata Consultancy Services (TCS), Infosys',
              'Research Institutes: IISER, TIFR, IISc',
              'Solar Companies: Adani Solar, Tata Power Solar',
              'Startups in Quantum Computing and Nanotech'
            ],
            skills: [
              'Circuit Design and Analysis',
              'Programming and Simulation Software (COMSOL, MATLAB, LabVIEW)',
              'Laboratory and Instrumentation Skills',
              'CAD Tools for Device Design',
              'Data Analysis and Statistical Methods',
              'Technical Writing and Documentation',
              'Project Management and Teamwork'
            ],
            trialTasks: [
              'Build a simple LED circuit with resistors and understand Ohm\'s Law practically',
              'Learn basics of Arduino programming - make an LED blink',
              'Watch videos on how semiconductor transistors work and modern chip manufacturing',
              'Research how solar panels work and calculate efficiency for a home setup',
              'Try a physics simulation software like PhET or Algodoo',
              'Read about recent advances in nanotechnology and their applications',
              'Visit a local electronics lab, manufacturing unit, or arrange a virtual tour'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc) - Chemistry',
        description: 'Study chemical processes, reactions, and modern analytical techniques',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Organic Chemistry',
            overview: 'Study carbon-based compounds, synthesis, and their applications in pharmaceuticals',
            whatYouLearn: [
              'Organic Synthesis and Reaction Mechanisms',
              'Stereochemistry and Molecular Structure',
              'Pharmaceutical Chemistry',
              'Natural Product Chemistry'
            ],
            jobProspects: [
              'Pharmaceutical Researcher',
              'Chemical Process Engineer',
              'Quality Control Analyst',
              'Organic Synthesis Chemist'
            ],
            eligibility: '10+2 with Chemistry',
            trialTasks: [
              'Identify organic compounds in everyday products',
              'Watch videos on drug discovery process',
              'Learn about functional groups in organic chemistry',
              'Research how aspirin is synthesized',
              'Study the structure of DNA and proteins',
              'Try molecular modeling software online',
              'Read about Nobel Prize winners in Chemistry'
            ]
          },
          {
            name: 'Analytical Chemistry',
            overview: 'Master techniques for identifying and quantifying chemical substances',
            whatYouLearn: [
              'Spectroscopy and Chromatography',
              'Electrochemical Analysis',
              'Quality Assurance Methods',
              'Instrumentation and Data Analysis'
            ],
            jobProspects: [
              'Analytical Chemist in Labs',
              'Quality Assurance Manager',
              'Forensic Scientist',
              'Environmental Analyst'
            ],
            eligibility: '10+2 with Chemistry',
            trialTasks: [
              'Learn about pH testing and indicators',
              'Watch crime scene investigation chemistry',
              'Research how water quality is tested',
              'Try a home chemistry experiment safely',
              'Study the periodic table elements',
              'Learn about food safety testing',
              'Explore chromatography techniques online'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc) - Mathematics',
        description: 'Master pure and applied mathematics with computational focus',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Pure Mathematics',
            overview: 'Dive deep into abstract mathematical theories, algebra, and analysis',
            whatYouLearn: [
              'Abstract Algebra and Group Theory',
              'Real and Complex Analysis',
              'Topology and Geometry',
              'Number Theory'
            ],
            jobProspects: [
              'Mathematics Researcher',
              'University Professor',
              'Cryptographer',
              'Mathematical Consultant'
            ],
            eligibility: '10+2 with Mathematics',
            trialTasks: [
              'Solve 10 algebra problems daily',
              'Learn about famous mathematical proofs',
              'Watch lectures on abstract algebra',
              'Try proving a simple mathematical theorem',
              'Explore the beauty of fractals',
              'Read about famous mathematicians',
              'Join an online mathematics community'
            ]
          },
          {
            name: 'Applied Mathematics',
            overview: 'Use mathematics to solve practical problems in science, engineering, and finance',
            whatYouLearn: [
              'Differential Equations',
              'Numerical Methods',
              'Optimization Theory',
              'Mathematical Modeling'
            ],
            jobProspects: [
              'Data Scientist',
              'Quantitative Analyst',
              'Operations Research Analyst',
              'Financial Analyst'
            ],
            eligibility: '10+2 with Mathematics',
            trialTasks: [
              'Learn Python for mathematical computations',
              'Solve real-world optimization problems',
              'Study how calculus is used in economics',
              'Try data visualization tools',
              'Learn about machine learning basics',
              'Solve differential equation problems',
              'Explore mathematical modeling software'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Arts (B.A) - English Literature',
        description: 'Explore classic and contemporary literature, critical theory, and creative writing',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Literary Studies',
            overview: 'Analyze and interpret literature from various periods and cultures',
            whatYouLearn: [
              'British and American Literature',
              'Literary Theory and Criticism',
              'Comparative Literature',
              'Post-Colonial Literature'
            ],
            jobProspects: [
              'Content Writer and Editor',
              'Literary Critic',
              'Publishing Professional',
              'Cultural Analyst'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Read a Shakespeare play',
              'Write a book review of your favorite novel',
              'Analyze a poem for themes and symbolism',
              'Start a reading journal',
              'Join an online book club',
              'Write a short story (500 words)',
              'Research a famous author\'s biography'
            ]
          },
          {
            name: 'Creative Writing',
            overview: 'Develop your voice as a fiction, poetry, or screenplay writer',
            whatYouLearn: [
              'Fiction and Short Story Writing',
              'Poetry Composition',
              'Screenwriting Techniques',
              'Publishing and Editing'
            ],
            jobProspects: [
              'Author and Novelist',
              'Screenwriter',
              'Content Creator',
              'Creative Director'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Write a 1000-word short story',
              'Compose 3 poems on different themes',
              'Start a personal blog',
              'Analyze dialogue in your favorite movie',
              'Join a writing workshop online',
              'Read "On Writing" by Stephen King',
              'Create character profiles for a story'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Arts (B.A) - Psychology',
        description: 'Study human behavior, cognitive processes, and psychological interventions',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Clinical Psychology',
            overview: 'Learn to assess and treat mental health disorders and emotional difficulties',
            whatYouLearn: [
              'Abnormal Psychology',
              'Psychotherapy Techniques',
              'Psychological Assessment',
              'Counseling Skills'
            ],
            jobProspects: [
              'Clinical Psychologist',
              'Mental Health Counselor',
              'Therapist',
              'Psychiatric Social Worker'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Learn about common mental health conditions',
              'Watch TED talks on psychology',
              'Read about famous case studies',
              'Practice active listening skills',
              'Study the DSM-5 basics',
              'Learn about cognitive behavioral therapy',
              'Volunteer at a mental health helpline'
            ]
          },
          {
            name: 'Organizational Psychology',
            overview: 'Apply psychological principles to workplace behavior and organizational development',
            whatYouLearn: [
              'Organizational Behavior',
              'Human Resource Management',
              'Leadership Psychology',
              'Workplace Motivation'
            ],
            jobProspects: [
              'HR Specialist',
              'Organizational Consultant',
              'Talent Development Manager',
              'Leadership Coach'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Study team dynamics in groups',
              'Learn about leadership styles',
              'Read about employee motivation theories',
              'Observe workplace behavior patterns',
              'Take a personality assessment test',
              'Research corporate culture examples',
              'Learn basics of conflict resolution'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Commerce (B.Com)',
        description: 'Comprehensive business education covering accounting, finance, and management',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Accounting and Finance',
            overview: 'Master financial accounting, taxation, and financial management',
            whatYouLearn: [
              'Financial Accounting',
              'Corporate Finance',
              'Taxation and Audit',
              'Financial Analysis'
            ],
            jobProspects: [
              'Chartered Accountant (CA)',
              'Financial Analyst',
              'Tax Consultant',
              'Audit Manager'
            ],
            eligibility: '10+2 with Commerce/Mathematics',
            trialTasks: [
              'Learn basic accounting principles',
              'Create a personal budget',
              'Study different types of business entities',
              'Watch videos on stock market basics',
              'Learn about GST and taxation',
              'Practice double-entry bookkeeping',
              'Read financial news daily'
            ]
          },
          {
            name: 'Banking and Insurance',
            overview: 'Specialize in banking operations, risk management, and insurance products',
            whatYouLearn: [
              'Banking Operations',
              'Risk Management',
              'Insurance Products',
              'Investment Banking'
            ],
            jobProspects: [
              'Bank Manager',
              'Insurance Underwriter',
              'Investment Advisor',
              'Risk Analyst'
            ],
            eligibility: '10+2 with Commerce/Mathematics',
            trialTasks: [
              'Learn about different types of bank accounts',
              'Study insurance policies (life, health, car)',
              'Understand interest rates and loans',
              'Research how credit cards work',
              'Learn about mutual funds',
              'Study the role of central banks',
              'Understand stock exchanges'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Business Administration (BBA)',
        description: 'Develop leadership and entrepreneurial skills for business careers',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Marketing Management',
            overview: 'Learn strategies for promoting products, branding, and customer engagement',
            whatYouLearn: [
              'Marketing Strategy',
              'Brand Management',
              'Digital Marketing',
              'Consumer Behavior'
            ],
            jobProspects: [
              'Marketing Manager',
              'Brand Strategist',
              'Social Media Manager',
              'Market Research Analyst'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Analyze advertising campaigns',
              'Create a mock marketing plan',
              'Learn social media marketing basics',
              'Study successful brand stories',
              'Research target audience analysis',
              'Watch videos on consumer psychology',
              'Try creating content for social media'
            ]
          },
          {
            name: 'Entrepreneurship',
            overview: 'Develop skills to start and manage your own business venture',
            whatYouLearn: [
              'Business Planning',
              'Startup Management',
              'Venture Capital',
              'Innovation Management'
            ],
            jobProspects: [
              'Entrepreneur',
              'Business Consultant',
              'Startup Founder',
              'Business Development Manager'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Develop a business idea',
              'Create a basic business plan',
              'Study successful startup stories',
              'Learn about funding options',
              'Research market gaps and opportunities',
              'Watch Shark Tank episodes',
              'Interview a local entrepreneur'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Economics',
        description: 'Analyze economic systems, markets, and policy through theory and data',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Macroeconomics',
            overview: 'Study national and global economic systems, growth, and policy',
            whatYouLearn: [
              'National Income Accounting',
              'Monetary and Fiscal Policy',
              'International Trade',
              'Economic Development'
            ],
            jobProspects: [
              'Economic Analyst',
              'Policy Advisor',
              'Economic Researcher',
              'Development Economist'
            ],
            eligibility: '10+2 with Mathematics',
            trialTasks: [
              'Learn about GDP and economic indicators',
              'Study how central banks work',
              'Analyze current economic policies',
              'Read The Economist magazine',
              'Understand inflation and unemployment',
              'Study international trade theories',
              'Follow economic news daily'
            ]
          },
          {
            name: 'Econometrics',
            overview: 'Apply statistical methods to economic data for analysis and forecasting',
            whatYouLearn: [
              'Statistical Analysis',
              'Economic Modeling',
              'Data Analytics',
              'Forecasting Techniques'
            ],
            jobProspects: [
              'Data Analyst',
              'Econometrician',
              'Market Research Analyst',
              'Quantitative Economist'
            ],
            eligibility: '10+2 with Mathematics',
            trialTasks: [
              'Learn Excel for data analysis',
              'Study basic statistics',
              'Try simple regression analysis',
              'Analyze economic datasets',
              'Learn Python or R basics',
              'Study survey methodology',
              'Practice data visualization'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Fine Arts (BFA)',
        description: 'Creative degree in visual arts, design, and artistic expression',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Visual Arts',
            overview: 'Master painting, sculpture, and traditional art forms',
            whatYouLearn: [
              'Drawing and Painting Techniques',
              'Sculpture and 3D Art',
              'Art History',
              'Contemporary Art Practices'
            ],
            jobProspects: [
              'Professional Artist',
              'Art Gallery Curator',
              'Art Teacher',
              'Freelance Illustrator'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Create 5 sketches of different objects',
              'Try painting with watercolors',
              'Visit an art gallery or museum',
              'Study works of famous painters',
              'Experiment with different mediums',
              'Join an art class or workshop',
              'Create a portfolio of your work'
            ]
          },
          {
            name: 'Graphic Design',
            overview: 'Create visual content for digital and print media',
            whatYouLearn: [
              'Typography and Layout Design',
              'Digital Illustration',
              'Branding and Identity',
              'UI/UX Design Basics'
            ],
            jobProspects: [
              'Graphic Designer',
              'UI/UX Designer',
              'Creative Director',
              'Brand Designer'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Learn Adobe Photoshop basics',
              'Design a simple logo',
              'Create a poster using Canva',
              'Study color theory',
              'Analyze designs of popular brands',
              'Practice typography exercises',
              'Build a design portfolio online'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Education (B.Ed)',
        description: 'Professional teaching degree with pedagogy and classroom management',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Elementary Education',
            overview: 'Train to teach primary and elementary school students',
            whatYouLearn: [
              'Child Psychology',
              'Elementary Pedagogy',
              'Curriculum Development',
              'Classroom Management'
            ],
            jobProspects: [
              'Elementary School Teacher',
              'Education Coordinator',
              'Curriculum Developer',
              'Educational Counselor'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Observe teaching methods in videos',
              'Create a simple lesson plan',
              'Learn about learning styles',
              'Practice explaining concepts simply',
              'Study child development stages',
              'Volunteer to tutor younger students',
              'Research effective teaching techniques'
            ]
          },
          {
            name: 'Secondary Education',
            overview: 'Prepare to teach high school students with subject specialization',
            whatYouLearn: [
              'Subject-Specific Pedagogy',
              'Adolescent Psychology',
              'Assessment Methods',
              'Educational Technology'
            ],
            jobProspects: [
              'High School Teacher',
              'Subject Matter Expert',
              'Educational Consultant',
              'Academic Coordinator'
            ],
            eligibility: '10+2 in any stream',
            trialTasks: [
              'Choose a teaching subject',
              'Create engaging presentations',
              'Learn about assessment techniques',
              'Study modern teaching tools',
              'Practice public speaking',
              'Research innovative teaching methods',
              'Shadow a high school teacher'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc) - Biotechnology',
        description: 'Apply biological systems and organisms to develop innovative products and technologies',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Medical Biotechnology',
            overview: 'Develop diagnostics, therapeutics, and medical devices using biological systems',
            detailedDescription: 'Medical Biotechnology is a rapidly growing field that combines biology, chemistry, and engineering to develop life-saving therapies and diagnostic tools. This specialization focuses on understanding disease mechanisms at the molecular level and creating innovative treatments including gene therapy, personalized medicine, and biologics. Students gain hands-on experience with cutting-edge techniques like CRISPR gene editing, protein engineering, and immunotherapy development. The curriculum balances theoretical knowledge with practical laboratory skills, preparing graduates to work in pharmaceutical companies, research institutions, and clinical laboratories. The field is revolutionizing healthcare with breakthroughs in cancer treatment, regenerative medicine, and vaccine development.',
            whatYouLearn: [
              'Genetic Engineering and CRISPR Technology',
              'Immunology and Vaccine Development',
              'Pharmaceutical Biotechnology and Drug Discovery',
              'Stem Cell Biology and Regenerative Medicine',
              'Protein Engineering and Antibody Production',
              'Bioinformatics and Computational Biology',
              'Clinical Trials and Regulatory Affairs',
              'Cancer Biology and Oncology Research'
            ],
            jobProspects: [
              'Biotech Research Scientist',
              'Clinical Research Associate',
              'Medical Laboratory Scientist',
              'Pharmaceutical Quality Control Analyst',
              'Regulatory Affairs Specialist',
              'Bioinformatics Analyst',
              'Genetic Counselor',
              'Bioprocess Engineer'
            ],
            eligibility: '10+2 with Biology, Chemistry, and Mathematics/Physics (minimum 70% aggregate)',
            prerequisites: [
              'Strong foundation in cell biology and genetics',
              'Basic chemistry and biochemistry knowledge',
              'Laboratory skills and safety awareness',
              'Interest in medicine and healthcare',
              'Analytical thinking and attention to detail'
            ],
            careerGrowth: 'Entry-level positions as research associates or lab technicians lead to senior scientist roles within 5-7 years. Many professionals pursue MS or PhD programs to advance into leadership positions. In industry, career progression includes project management, clinical development, and eventually director-level positions. Salaries increase significantly with specialization in areas like gene therapy or CAR-T cell research.',
            industryTrends: 'Explosive growth in mRNA vaccine technology post-COVID-19. CRISPR gene editing applications expanding rapidly. Personalized medicine and precision oncology becoming mainstream. AI-driven drug discovery accelerating development timelines. Cell and gene therapy market projected to reach $50+ billion by 2028. Growing demand for biosimilars and biologics.',
            averageSalary: 'Entry: ₹3.5-6 LPA | Mid-level: ₹8-18 LPA | Senior: ₹20-40 LPA | PhD holders: ₹25-60 LPA',
            topRecruiters: [
              'Biocon, Serum Institute of India, Cipla',
              'Dr. Reddy\'s Laboratories, Sun Pharma',
              'Thermo Fisher Scientific, PerkinElmer',
              'Novartis, Roche, Pfizer, Johnson & Johnson',
              'CSIR Labs, DBT Research Institutes',
              'Illumina, Qiagen, Bio-Rad',
              'Startups: Strand Genomics, MedGenome, 4baseCare'
            ],
            skills: [
              'Molecular Biology Techniques (PCR, Gel Electrophoresis, DNA Sequencing)',
              'Cell Culture and Aseptic Techniques',
              'Protein Purification and Analysis',
              'Bioinformatics Tools and Software',
              'Data Analysis and Statistical Methods',
              'Scientific Writing and Documentation',
              'Quality Management Systems (GMP, GLP)'
            ],
            trialTasks: [
              'Watch a documentary on gene editing (e.g., "Human Nature" on CRISPR)',
              'Learn about the structure of DNA and RNA',
              'Research how vaccines are developed and tested',
              'Read about recent biotechnology breakthroughs in news',
              'Try a virtual lab simulation for DNA extraction',
              'Study the difference between traditional drugs and biologics',
              'Research career paths of famous biotechnologists'
            ]
          },
          {
            name: 'Agricultural Biotechnology',
            overview: 'Improve crop yields, nutrition, and sustainability using biotechnology',
            detailedDescription: 'Agricultural Biotechnology applies cutting-edge molecular biology and genetic engineering to address global food security challenges. This field focuses on developing disease-resistant crops, improving nutritional content, and creating sustainable farming practices. Students learn to manipulate plant genomes, develop biopesticides, and use biotechnology to combat climate change impacts on agriculture. The discipline combines laboratory research with field trials, requiring understanding of both molecular biology and agriculture. With world population growing and climate challenges intensifying, agricultural biotechnologists are crucial for ensuring food security and sustainable farming.',
            whatYouLearn: [
              'Plant Genetic Engineering and GMO Development',
              'Crop Improvement and Disease Resistance',
              'Agricultural Microbiology and Biofertilizers',
              'Plant Tissue Culture and Micropropagation',
              'Biopesticides and Biocontrol Agents',
              'Molecular Markers and Plant Breeding',
              'Soil Biotechnology and Sustainable Agriculture',
              'Food Biotechnology and Quality Control'
            ],
            jobProspects: [
              'Agricultural Scientist',
              'Plant Biotechnologist',
              'Seed Technology Specialist',
              'Research Officer in Agricultural Companies',
              'Biofertilizer Production Manager',
              'Agricultural Consultant',
              'Quality Assurance Manager in Food Industry',
              'Agribusiness Development Manager'
            ],
            eligibility: '10+2 with Biology and Chemistry (minimum 65% aggregate)',
            prerequisites: [
              'Interest in agriculture and environmental sustainability',
              'Basic knowledge of plant biology and genetics',
              'Understanding of ecological systems',
              'Willingness to work in laboratory and field environments',
              'Problem-solving skills for real-world challenges'
            ],
            careerGrowth: 'Start as research assistants in agricultural research institutes or seed companies. With experience and higher studies (MS/PhD), progress to senior scientist or R&D manager positions. Many entrepreneurs start their own agribiotech firms focusing on organic farming solutions or specialty crops. Government agricultural departments offer stable career paths with pension benefits.',
            industryTrends: 'Growing demand for organic and sustainable farming solutions. Climate-resilient crop development becoming critical. Vertical farming and urban agriculture gaining traction. Precision agriculture using biotechnology and AI. Government push for self-reliance in seed technology. Rising investment in agritech startups. Biofortification to combat malnutrition.',
            averageSalary: 'Entry: ₹3-5 LPA | Mid-level: ₹6-12 LPA | Senior: ₹15-30 LPA | Entrepreneurship potential: Unlimited',
            topRecruiters: [
              'ICAR Research Institutes, State Agricultural Universities',
              'Bayer Crop Science, Syngenta, Corteva',
              'Mahyco, Nuziveedu Seeds, Kaveri Seeds',
              'IFFCO, Coromandel International',
              'Jain Irrigation, Godrej Agrovet',
              'Food Processing Companies: Nestle, ITC',
              'Startups: CropIn, Agrostar, DeHaat'
            ],
            skills: [
              'Plant Tissue Culture Techniques',
              'Genetic Transformation Methods',
              'Field Trial Design and Management',
              'Agricultural Data Analysis',
              'IPR and Patent Knowledge',
              'Sustainable Farming Practices',
              'Communication with Farmers and Stakeholders'
            ],
            trialTasks: [
              'Learn about Green Revolution and its biotechnology aspects',
              'Study how Bt Cotton was developed in India',
              'Visit a local farm or nursery to understand plant breeding',
              'Research Golden Rice and biofortified crops',
              'Learn about organic farming and biopesticides',
              'Watch videos on tissue culture and micropropagation',
              'Read about climate change impact on agriculture'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc) - Environmental Science',
        description: 'Study ecosystems, conservation, and solutions to environmental challenges',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Environmental Management',
            overview: 'Develop strategies for sustainable resource management and environmental protection',
            detailedDescription: 'Environmental Management is a critical field addressing the urgent need for sustainable development and environmental conservation. This specialization equips students with tools to assess environmental impacts, develop conservation strategies, and ensure regulatory compliance. Professionals work at the intersection of science, policy, and business to balance economic development with environmental protection. The curriculum covers pollution control, waste management, renewable energy, and climate change mitigation. Graduates play vital roles in industries, government agencies, and NGOs, implementing solutions for clean air, water, and soil while promoting sustainable practices.',
            whatYouLearn: [
              'Environmental Impact Assessment (EIA)',
              'Air and Water Pollution Control',
              'Solid and Hazardous Waste Management',
              'Climate Change and Carbon Management',
              'Renewable Energy Systems',
              'Environmental Law and Policy',
              'Sustainable Development Practices',
              'GIS and Remote Sensing for Environmental Monitoring'
            ],
            jobProspects: [
              'Environmental Consultant',
              'Sustainability Manager',
              'EIA Specialist',
              'Pollution Control Officer',
              'Waste Management Expert',
              'Environmental Compliance Officer',
              'Climate Change Analyst',
              'Renewable Energy Project Manager'
            ],
            eligibility: '10+2 with Science subjects (Biology/Physics/Chemistry)',
            prerequisites: [
              'Passion for environmental conservation',
              'Basic understanding of ecology and ecosystems',
              'Interest in policy and regulations',
              'Field work willingness',
              'Analytical and problem-solving skills'
            ],
            careerGrowth: 'Begin as environmental officers or consultants in industries or consulting firms. With 3-5 years experience, advance to senior consultant or manager positions. Many pursue environmental auditing certifications (ISO 14001, Lead Auditor) for career advancement. Opportunities exist to specialize in areas like carbon trading, renewable energy, or environmental law. Senior professionals become sustainability directors or start consulting firms.',
            industryTrends: 'Corporate ESG (Environmental, Social, Governance) compliance becoming mandatory. Carbon neutrality targets driving demand for environmental professionals. Electric vehicle adoption increasing need for battery waste management expertise. Plastic waste management and circular economy gaining focus. Green building certifications (LEED, IGBC) creating jobs. Government renewable energy push creating opportunities.',
            averageSalary: 'Entry: ₹3-6 LPA | Mid-level: ₹7-15 LPA | Senior: ₹18-35 LPA | Consultants: Project-based earnings',
            topRecruiters: [
              'TERI (The Energy and Resources Institute)',
              'State Pollution Control Boards',
              'Environmental Consulting: ERM, Rambol, CRISIL',
              'Industries: Tata Steel, L&T, Reliance',
              'NGOs: WWF India, Greenpeace, CED',
              'Renewable Energy: Suzlon, Tata Power Solar',
              'Government: Ministry of Environment, Forest Survey'
            ],
            skills: [
              'Environmental Auditing and Monitoring',
              'GIS and Remote Sensing Software',
              'Report Writing and Documentation',
              'Regulatory Compliance Knowledge',
              'Project Management',
              'Stakeholder Communication',
              'Field Survey and Sampling Techniques'
            ],
            trialTasks: [
              'Study the environmental impact of plastic waste',
              'Learn about India\'s renewable energy targets',
              'Calculate your personal carbon footprint',
              'Research local environmental issues in your city',
              'Watch documentaries like "Our Planet" or "Before the Flood"',
              'Learn about different types of renewable energy',
              'Volunteer for a tree plantation or cleanup drive'
            ]
          },
          {
            name: 'Wildlife Conservation',
            overview: 'Protect endangered species and preserve biodiversity through scientific research',
            detailedDescription: 'Wildlife Conservation is dedicated to protecting biodiversity and preserving natural habitats in the face of rapid environmental change. This specialized field combines field biology, ecology, and conservation management to save endangered species and restore ecosystems. Students learn to conduct wildlife surveys, manage protected areas, address human-wildlife conflict, and implement conservation programs. The work often involves adventure, fieldwork in remote locations, and collaboration with local communities. Conservation biologists use modern technology including GPS tracking, camera traps, and DNA analysis to monitor wildlife populations and develop effective conservation strategies.',
            whatYouLearn: [
              'Wildlife Ecology and Behavior',
              'Conservation Biology and Biodiversity',
              'Protected Area Management',
              'Human-Wildlife Conflict Mitigation',
              'Wildlife Survey and Monitoring Techniques',
              'Habitat Restoration and Management',
              'Conservation Genetics',
              'Wildlife Photography and Documentation'
            ],
            jobProspects: [
              'Wildlife Biologist',
              'Conservation Officer',
              'Forest Ranger',
              'Wildlife Researcher',
              'National Park Manager',
              'Conservation NGO Program Manager',
              'Wildlife Veterinarian',
              'Environmental Educator'
            ],
            eligibility: '10+2 with Biology (minimum 60% aggregate)',
            prerequisites: [
              'Deep passion for wildlife and nature',
              'Physical fitness for field work',
              'Patience for long-term observation',
              'Basic knowledge of animal behavior and ecology',
              'Willingness to work in remote areas'
            ],
            careerGrowth: 'Start as field assistants or junior researchers in wildlife projects. With experience and possibly MS/PhD in Wildlife Sciences, advance to project leader or research scientist positions. Many work with government forest departments as Range Officers or IFS officers. NGO career paths lead to program management and policy advocacy. International opportunities exist with organizations like WWF, WCS, or IUCN.',
            industryTrends: 'Increased funding for tiger and elephant conservation projects. Technology integration: drones, AI for species identification, satellite tracking. Community-based conservation models gaining prominence. Wildlife tourism creating sustainable livelihoods. Growing concern about declining insect populations. Urban wildlife management becoming important. Climate change adaptation for wildlife becoming critical.',
            averageSalary: 'Entry: ₹2.5-5 LPA (NGO/Research) | Government: ₹6-10 LPA | Mid-level: ₹8-18 LPA | Senior: ₹20-40 LPA',
            topRecruiters: [
              'Wildlife Institute of India, Bombay Natural History Society',
              'WWF India, Wildlife Conservation Society',
              'State Forest Departments, Project Tiger',
              'Centre for Wildlife Studies, Nature Conservation Foundation',
              'Tiger Reserves and National Parks',
              'Zoological Survey of India',
              'Wildlife SOS, Help in Suffering'
            ],
            skills: [
              'Wildlife Identification and Taxonomy',
              'Field Survey Methods (Line Transects, Camera Trapping)',
              'GIS Mapping and Spatial Analysis',
              'Statistical Analysis for Ecology',
              'Scientific Writing and Grant Proposal Development',
              'Community Engagement and Education',
              'Photography and Videography'
            ],
            trialTasks: [
              'Start bird watching and maintain a species log',
              'Learn to identify 20 common Indian birds or animals',
              'Watch wildlife documentaries and note animal behaviors',
              'Read about famous conservationists like Jim Corbett, Jane Goodall',
              'Visit a zoo or wildlife sanctuary',
              'Learn about endangered species in India',
              'Practice wildlife photography in a local park'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc) - Forensic Science',
        description: 'Apply scientific methods to investigate crimes and analyze evidence',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Criminal Investigation',
            overview: 'Master crime scene investigation, evidence collection, and forensic analysis',
            detailedDescription: 'Criminal Investigation through Forensic Science is a fascinating field that applies chemistry, biology, and physics to solve crimes. This specialization trains students in evidence collection, crime scene documentation, and laboratory analysis of physical evidence. Professionals work with law enforcement agencies, examining everything from fingerprints and DNA to ballistics and digital evidence. The field requires meticulous attention to detail, scientific rigor, and the ability to present findings in court. With increasing use of scientific evidence in criminal justice, forensic scientists play a crucial role in ensuring justice through objective analysis.',
            whatYouLearn: [
              'Crime Scene Investigation and Documentation',
              'Forensic Biology and DNA Analysis',
              'Fingerprint Analysis and Pattern Recognition',
              'Forensic Chemistry and Toxicology',
              'Ballistics and Tool Mark Analysis',
              'Digital Forensics and Cybercrime Investigation',
              'Forensic Psychology and Criminal Profiling',
              'Courtroom Testimony and Legal Procedures'
            ],
            jobProspects: [
              'Forensic Analyst in Crime Laboratories',
              'Crime Scene Investigator',
              'DNA Analyst',
              'Forensic Toxicologist',
              'Fingerprint Examiner',
              'Digital Forensics Expert',
              'Forensic Consultant',
              'Research Scientist in Forensic Institutes'
            ],
            eligibility: '10+2 with Physics, Chemistry, and Biology/Mathematics (minimum 70% aggregate)',
            prerequisites: [
              'Strong foundation in chemistry and biology',
              'Interest in criminal justice and law',
              'Attention to detail and patience',
              'Analytical and logical thinking',
              'Ability to handle sensitive situations'
            ],
            careerGrowth: 'Entry as forensic analysts or lab technicians in state forensic labs or private laboratories. With 5-7 years experience and additional certifications, advance to senior analyst or lab supervisor positions. Many pursue specialized training in areas like DNA analysis, toxicology, or digital forensics. Career paths include working with CBI, state police forensic labs, or private investigation firms. Expert forensic scientists often serve as expert witnesses in high-profile cases.',
            industryTrends: 'Rapid DNA technology reducing analysis time from weeks to hours. Digital forensics booming with increase in cybercrimes. Forensic databases (DNA, fingerprints) expanding nationwide. Private forensic labs growing alongside government facilities. Forensic accounting becoming important for financial crimes. Growing need for disaster victim identification experts. TV shows increasing public awareness and career interest.',
            averageSalary: 'Entry: ₹3-6 LPA | Mid-level: ₹7-15 LPA | Senior: ₹18-35 LPA | Private consultants: ₹25-50 LPA',
            topRecruiters: [
              'State Forensic Science Laboratories',
              'Central Bureau of Investigation (CBI)',
              'National Investigation Agency (NIA)',
              'Central Forensic Science Laboratory (CFSL)',
              'State Police Departments',
              'Private Investigation Agencies',
              'Truth Labs, Clue4Evidence (Private Labs)',
              'Research Institutes: LNJN NICFS, Gujarat Forensic Sciences University'
            ],
            skills: [
              'Evidence Collection and Preservation',
              'Laboratory Techniques (Chromatography, Spectroscopy)',
              'DNA Extraction and PCR Analysis',
              'Microscopy and Visual Examination',
              'Report Writing and Documentation',
              'Chain of Custody Management',
              'Photography and Evidence Documentation'
            ],
            trialTasks: [
              'Watch forensic investigation documentaries',
              'Learn about different types of evidence (physical, digital, biological)',
              'Study how fingerprints are classified',
              'Understand the basics of DNA profiling',
              'Read about famous criminal cases solved by forensics',
              'Learn about the Indian Evidence Act',
              'Try simple observation exercises to improve attention to detail'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc) - Nutrition and Dietetics',
        description: 'Science of food, nutrition, and their impact on health and disease prevention',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Clinical Nutrition',
            overview: 'Provide nutritional therapy for patients with medical conditions',
            detailedDescription: 'Clinical Nutrition is a healthcare specialty that uses food and nutrition as medicine to prevent and treat diseases. Clinical nutritionists work in hospitals, clinics, and healthcare facilities, designing therapeutic diets for patients with conditions like diabetes, heart disease, kidney disorders, and cancer. The field combines deep knowledge of biochemistry, physiology, and nutrition science with practical patient care. Professionals assess nutritional status, develop meal plans, and monitor patient progress. With rising lifestyle diseases and growing health consciousness, clinical nutritionists are increasingly important in healthcare teams.',
            whatYouLearn: [
              'Human Nutrition and Metabolism',
              'Medical Nutrition Therapy',
              'Clinical Biochemistry and Pathophysiology',
              'Diet Planning for Chronic Diseases',
              'Pediatric and Geriatric Nutrition',
              'Nutritional Assessment Methods',
              'Food Service Management in Healthcare',
              'Nutrition Counseling and Behavior Change'
            ],
            jobProspects: [
              'Clinical Dietitian in Hospitals',
              'Nutritionist in Healthcare Centers',
              'Diabetes Educator',
              'Renal Dietitian',
              'Oncology Nutritionist',
              'Nutrition Consultant in Clinics',
              'Corporate Wellness Nutritionist',
              'Private Practice Dietitian'
            ],
            eligibility: '10+2 with Biology and Chemistry (minimum 65% aggregate)',
            prerequisites: [
              'Interest in health and medicine',
              'Basic understanding of human biology',
              'Good communication and counseling skills',
              'Empathy and patience for working with patients',
              'Interest in cooking and food science'
            ],
            careerGrowth: 'Start as junior dietitians in hospitals or healthcare centers. With experience and certifications (like Certified Diabetes Educator), advance to senior or chief dietitian positions. Many establish private consultation practices after gaining experience. Specialization in areas like sports nutrition, renal nutrition, or oncology nutrition increases earning potential. Some become nutrition educators or consultants for food companies.',
            industryTrends: 'Booming wellness and preventive healthcare sector. Rise in lifestyle diseases increasing demand for nutritionists. Corporate wellness programs incorporating nutrition counseling. Telemedicine and online nutrition consultations growing. Personalized nutrition based on genetics gaining attention. Plant-based nutrition and sustainable diets trending. Integration of nutritionists in primary healthcare teams.',
            averageSalary: 'Entry: ₹2.5-5 LPA | Mid-level: ₹6-12 LPA | Senior: ₹15-30 LPA | Private practice: ₹20-50 LPA+',
            topRecruiters: [
              'Apollo Hospitals, Fortis Healthcare, Max Healthcare',
              'AIIMS, PGI Chandigarh, CMC Vellore',
              'Corporate Wellness: Arogya World, GOQii',
              'Fitness Centers: Cult.fit, Talwalkars',
              'Food Companies: Nestle, Danone, Abbott',
              'Health Tech Startups: HealthifyMe, Possible',
              'Diagnostic Centers: Dr. Lal PathLabs, Thyrocare'
            ],
            skills: [
              'Patient Assessment and Counseling',
              'Diet Planning and Menu Development',
              'Medical Nutrition Therapy Protocols',
              'Food-Drug Interactions Knowledge',
              'Health Record Documentation',
              'Motivational Interviewing',
              'Nutrition Software and Databases'
            ],
            trialTasks: [
              'Learn about macronutrients (carbs, proteins, fats) and micronutrients',
              'Calculate BMI and understand healthy weight ranges',
              'Study the food pyramid and balanced diet concept',
              'Research diet plans for common conditions (diabetes, hypertension)',
              'Learn to read nutrition labels on packaged foods',
              'Plan a week\'s balanced meal plan for a family',
              'Watch videos on nutrition myths vs facts'
            ]
          }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc) - Data Science and Analytics',
        description: 'Extract insights from data using statistics, programming, and machine learning',
        targetRole: 'pre-university',
        branches: [
          {
            name: 'Business Analytics',
            overview: 'Use data analysis to drive business decisions and strategy',
            detailedDescription: 'Business Analytics combines statistical analysis, data mining, and business intelligence to help organizations make data-driven decisions. This field focuses on analyzing historical and real-time data to identify trends, predict outcomes, and optimize business processes. Professionals work across industries - from retail and e-commerce to banking and healthcare - providing insights that drive revenue growth, cost reduction, and customer satisfaction. The curriculum blends technical skills (programming, statistics, visualization) with business acumen (marketing, finance, operations). With digital transformation accelerating, business analysts are among the most sought-after professionals.',
            whatYouLearn: [
              'Statistical Analysis and Probability',
              'Data Mining and Pattern Recognition',
              'Business Intelligence Tools (Tableau, Power BI)',
              'Predictive Modeling and Forecasting',
              'Customer Analytics and Segmentation',
              'A/B Testing and Experimentation',
              'SQL and Database Management',
              'Python and R for Data Analysis'
            ],
            jobProspects: [
              'Business Analyst',
              'Data Analyst',
              'Business Intelligence Developer',
              'Marketing Analyst',
              'Financial Analyst',
              'Operations Analyst',
              'Product Analyst',
              'Customer Insights Manager'
            ],
            eligibility: '10+2 with Mathematics (minimum 70% aggregate)',
            prerequisites: [
              'Strong mathematics and statistics foundation',
              'Logical thinking and problem-solving',
              'Interest in business and technology',
              'Basic understanding of Excel',
              'Curiosity about patterns and trends'
            ],
            careerGrowth: 'Entry-level positions as junior analysts with salary around ₹4-8 LPA. Within 3-5 years, advance to senior analyst or specialist roles (₹10-20 LPA). Many transition to data science, product management, or consulting roles. With MBA or specialized certifications, reach manager and director positions (₹25-60 LPA). Some become independent consultants serving multiple clients.',
            industryTrends: 'Explosive growth in data-driven decision making across all industries. Self-service BI tools democratizing analytics. Real-time analytics becoming standard. AI and ML augmenting traditional analytics. Customer data platforms (CDPs) creating new opportunities. Privacy regulations (GDPR, India\'s data law) shaping the field. Cloud-based analytics reducing infrastructure costs.',
            averageSalary: 'Entry: ₹4-8 LPA | Mid-level: ₹10-20 LPA | Senior: ₹25-45 LPA | Specialized roles: ₹50 LPA+',
            topRecruiters: [
              'Consulting: McKinsey, BCG, Bain, Deloitte, EY',
              'Tech: Google, Microsoft, Amazon, Adobe',
              'E-commerce: Flipkart, Amazon, Myntra',
              'Finance: JPMorgan, Goldman Sachs, HDFC, ICICI',
              'Startups: Swiggy, Zomato, PhonePe, Razorpay',
              'Analytics Firms: Mu Sigma, Fractal Analytics, LatentView',
              'FMCG: Unilever, P&G, ITC'
            ],
            skills: [
              'Excel (Advanced - Pivot Tables, VBA)',
              'SQL for Data Querying',
              'Python (Pandas, NumPy) or R',
              'Data Visualization (Tableau, Power BI)',
              'Statistical Analysis',
              'Business Communication',
              'Problem Structuring and Hypothesis Testing'
            ],
            trialTasks: [
              'Learn Excel basics - formulas, charts, pivot tables',
              'Analyze a dataset (download from Kaggle) and create visualizations',
              'Learn basic SQL - try online interactive tutorials',
              'Study real business cases - how companies use data',
              'Take a free online course on statistics',
              'Try Tableau Public or Power BI Desktop (free versions)',
              'Read analytics blogs and case studies'
            ]
          }
        ]
      }
    ];

    // Create degrees and branches
    for (const degreeData of degreesData) {
      const { branches: branchesData, ...degreeInfo } = degreeData;
      const degree = await Degree.create(degreeInfo);
      console.log(`✓ Created degree: ${degree.name}`);

      // Create branches for this degree
      if (branchesData && branchesData.length > 0) {
        for (const branchData of branchesData) {
          const branch = await Branch.create({
            ...branchData,
            degreeId: degree._id
          });
          
          // Update degree with branch reference
          degree.branches.push(branch._id);
          console.log(`  ✓ Created branch: ${branch.name}`);
        }
        await degree.save();
      }
      console.log('');
    }

    console.log(`\n✅ Successfully seeded ${degreesData.length} degrees with branches!`);

    // Seed courses for undergraduate students
    console.log('\nSeeding courses for undergraduate students...\n');
    
    const coursesData = [
      // Computer Science and Engineering Courses
      {
        name: 'Advanced Data Structures and Algorithms',
        branch: 'Computer Science and Engineering',
        overview: 'Master complex data structures, algorithmic paradigms, and optimization techniques for efficient problem-solving',
        advancedTopics: [
          'Advanced Graph Algorithms (Dijkstra, Floyd-Warshall, Network Flow)',
          'Dynamic Programming and Memoization',
          'Advanced Tree Structures (B-Trees, Red-Black Trees, Segment Trees)',
          'String Matching Algorithms (KMP, Rabin-Karp, Z-Algorithm)',
          'Computational Geometry',
          'Approximation Algorithms for NP-Hard Problems',
          'Parallel and Distributed Algorithms'
        ],
        projects: [
          'Build a Route Optimization System for Delivery Services',
          'Implement a Search Engine with Ranking Algorithm',
          'Create a Recommendation System using Collaborative Filtering',
          'Design a Compiler with Lexical and Syntax Analysis',
          'Build a Real-time Pathfinding Visualizer'
        ]
      },
      {
        name: 'Machine Learning and AI',
        branch: 'Computer Science and Engineering',
        overview: 'Learn to build intelligent systems using supervised, unsupervised, and reinforcement learning techniques',
        advancedTopics: [
          'Deep Learning and Neural Networks (CNNs, RNNs, Transformers)',
          'Natural Language Processing and Large Language Models',
          'Computer Vision and Image Recognition',
          'Reinforcement Learning and Q-Learning',
          'Generative AI (GANs, VAEs, Diffusion Models)',
          'Transfer Learning and Fine-tuning',
          'MLOps and Model Deployment'
        ],
        projects: [
          'Build an Image Classification System using CNNs',
          'Create a Chatbot using Transformer Models',
          'Develop a Sentiment Analysis Tool for Social Media',
          'Build a Real-time Object Detection System',
          'Create a Recommendation Engine for E-commerce'
        ]
      },
      {
        name: 'Cloud Computing and DevOps',
        branch: 'Computer Science and Engineering',
        overview: 'Master cloud platforms, containerization, CI/CD pipelines, and infrastructure as code',
        advancedTopics: [
          'AWS, Azure, and Google Cloud Platform Architecture',
          'Docker and Kubernetes for Container Orchestration',
          'Terraform and Infrastructure as Code',
          'CI/CD Pipelines with Jenkins, GitHub Actions, GitLab CI',
          'Microservices Architecture and API Gateway',
          'Serverless Computing and Lambda Functions',
          'Cloud Security and Compliance'
        ],
        projects: [
          'Deploy a Scalable Web Application on AWS/Azure',
          'Build a CI/CD Pipeline for Automated Testing and Deployment',
          'Create a Microservices Architecture with Docker and Kubernetes',
          'Implement Infrastructure as Code using Terraform',
          'Design a Serverless Application with AWS Lambda'
        ]
      },
      {
        name: 'Full Stack Web Development',
        branch: 'Computer Science and Engineering',
        overview: 'Build modern web applications using React, Node.js, databases, and RESTful APIs',
        advancedTopics: [
          'React.js, Next.js, and Modern Frontend Frameworks',
          'Node.js, Express.js for Backend Development',
          'MongoDB, PostgreSQL Database Design',
          'RESTful API Design and GraphQL',
          'Authentication and Authorization (JWT, OAuth)',
          'WebSockets and Real-time Communication',
          'Progressive Web Apps (PWAs) and Mobile-First Design'
        ],
        projects: [
          'Build a Social Media Platform with Real-time Features',
          'Create an E-commerce Website with Payment Integration',
          'Develop a Project Management Tool (Like Trello/Asana)',
          'Build a Video Streaming Platform',
          'Create a Real-time Collaborative Code Editor'
        ]
      },
      {
        name: 'Cybersecurity and Ethical Hacking',
        branch: 'Computer Science and Engineering',
        overview: 'Learn to identify vulnerabilities, secure systems, and perform ethical penetration testing',
        advancedTopics: [
          'Network Security and Penetration Testing',
          'Web Application Security (OWASP Top 10)',
          'Cryptography and Encryption Techniques',
          'Malware Analysis and Reverse Engineering',
          'Security Information and Event Management (SIEM)',
          'Cloud Security and Zero Trust Architecture',
          'Incident Response and Digital Forensics'
        ],
        projects: [
          'Conduct a Security Audit of a Web Application',
          'Build a Network Intrusion Detection System',
          'Create a Password Manager with Encryption',
          'Perform Penetration Testing on a Practice Environment',
          'Develop a Security Awareness Training Platform'
        ]
      },
      
      // Mechanical Engineering Courses
      {
        name: 'Computer-Aided Design and Manufacturing',
        branch: 'Mechanical Engineering',
        overview: 'Master CAD software, 3D modeling, and automated manufacturing processes',
        advancedTopics: [
          'Advanced SolidWorks, AutoCAD, and CATIA',
          '3D Modeling and Parametric Design',
          'Finite Element Analysis (FEA)',
          'Computer Numerical Control (CNC) Programming',
          'Additive Manufacturing and 3D Printing',
          'Computer-Integrated Manufacturing',
          'Product Lifecycle Management (PLM)'
        ],
        projects: [
          'Design a Complex Mechanical Assembly in SolidWorks',
          'Create a 3D Printed Prototype of a Product',
          'Perform Stress Analysis on a Bridge Structure',
          'Design and Simulate a Robotic Arm',
          'Build a CNC Machine Part with Optimized Toolpath'
        ]
      },
      {
        name: 'Robotics and Automation',
        branch: 'Mechanical Engineering',
        overview: 'Design and program robots, automated systems, and industrial automation',
        advancedTopics: [
          'Robot Kinematics and Dynamics',
          'Industrial Automation and PLC Programming',
          'Sensors, Actuators, and Control Systems',
          'Computer Vision for Robotics',
          'Autonomous Mobile Robots',
          'Human-Robot Interaction',
          'Industrial IoT and Smart Manufacturing'
        ],
        projects: [
          'Build an Autonomous Line-Following Robot',
          'Design a Pick-and-Place Robotic Arm',
          'Create a Warehouse Automation System Simulation',
          'Develop a Drone with Object Avoidance',
          'Build a Smart Factory Monitoring System'
        ]
      },
      {
        name: 'Thermal and Fluid Systems',
        branch: 'Mechanical Engineering',
        overview: 'Analyze heat transfer, fluid dynamics, and energy conversion systems',
        advancedTopics: [
          'Computational Fluid Dynamics (CFD)',
          'Heat Exchanger Design and Analysis',
          'HVAC Systems and Thermal Comfort',
          'Turbomachinery and Compressor Design',
          'Refrigeration and Air Conditioning',
          'Renewable Energy Systems (Solar Thermal, Wind)',
          'Energy Audit and Efficiency Optimization'
        ],
        projects: [
          'Simulate Airflow Over an Airfoil using CFD',
          'Design an Efficient Heat Exchanger',
          'Optimize HVAC System for a Building',
          'Analyze Performance of a Wind Turbine',
          'Design a Solar Water Heating System'
        ]
      },
      
      // Electrical Engineering Courses
      {
        name: 'Power Systems and Smart Grid',
        branch: 'Electrical Engineering',
        overview: 'Study power generation, transmission, distribution, and smart grid technologies',
        advancedTopics: [
          'Power System Analysis and Load Flow',
          'Smart Grid Technologies and Automation',
          'Renewable Energy Integration (Solar, Wind)',
          'Energy Storage Systems and Battery Management',
          'Power System Protection and Relaying',
          'SCADA Systems and Remote Monitoring',
          'Electric Vehicle Charging Infrastructure'
        ],
        projects: [
          'Design a Microgrid with Renewable Energy Sources',
          'Build a Solar Power System with MPPT Controller',
          'Simulate Load Flow Analysis for a Power Network',
          'Create a Smart Home Energy Management System',
          'Design an EV Charging Station with Load Balancing'
        ]
      },
      {
        name: 'Embedded Systems and IoT',
        branch: 'Electrical Engineering',
        overview: 'Develop embedded systems, microcontroller programming, and IoT applications',
        advancedTopics: [
          'ARM Cortex Microcontrollers and Programming',
          'Real-Time Operating Systems (RTOS)',
          'Wireless Communication Protocols (WiFi, Bluetooth, LoRa)',
          'Sensor Networks and Data Acquisition',
          'Edge Computing and Fog Computing',
          'IoT Security and Privacy',
          'Industrial IoT (IIoT) Applications'
        ],
        projects: [
          'Build a Smart Home Automation System',
          'Create a Weather Station with Cloud Integration',
          'Develop a Wearable Health Monitoring Device',
          'Design an Industrial Equipment Monitoring System',
          'Build a Smart Agriculture System with Sensors'
        ]
      },
      {
        name: 'Control Systems and Automation',
        branch: 'Electrical Engineering',
        overview: 'Design and implement automatic control systems for industrial processes',
        advancedTopics: [
          'PID Controllers and Tuning Methods',
          'State-Space Analysis and Design',
          'Digital Control Systems',
          'Adaptive and Robust Control',
          'Model Predictive Control (MPC)',
          'Process Automation and SCADA',
          'Motor Control and Drives'
        ],
        projects: [
          'Design a Temperature Control System',
          'Build a Self-Balancing Robot using PID Control',
          'Create a Speed Control System for DC Motor',
          'Implement a Flight Controller for a Drone',
          'Design an Automated Assembly Line Controller'
        ]
      },
      
      // Civil Engineering Courses
      {
        name: 'Structural Analysis and Design',
        branch: 'Civil Engineering',
        overview: 'Analyze and design buildings, bridges, and infrastructure using modern software',
        advancedTopics: [
          'Structural Analysis using STAAD.Pro and ETABS',
          'Earthquake-Resistant Design',
          'Bridge Design and Analysis',
          'Prestressed and Reinforced Concrete Design',
          'Steel Structure Design',
          'Foundation Design and Soil-Structure Interaction',
          'Building Information Modeling (BIM)'
        ],
        projects: [
          'Design a Multi-Story Building with Seismic Analysis',
          'Analyze and Design a Highway Bridge',
          'Create a BIM Model for a Commercial Complex',
          'Design a Water Tank with Structural Stability',
          'Perform Wind Load Analysis on a High-Rise Building'
        ]
      },
      {
        name: 'Transportation Engineering',
        branch: 'Civil Engineering',
        overview: 'Plan, design, and manage transportation systems and traffic flow',
        advancedTopics: [
          'Highway Geometric Design',
          'Traffic Engineering and Signal Optimization',
          'Transportation Planning and Modeling',
          'Pavement Design and Management',
          'Public Transit Systems',
          'Intelligent Transportation Systems (ITS)',
          'Sustainable Transportation'
        ],
        projects: [
          'Design a Highway Intersection with Traffic Analysis',
          'Optimize Traffic Signal Timing for a Network',
          'Plan a Bus Rapid Transit (BRT) System',
          'Analyze Pavement Performance and Maintenance',
          'Design a Smart Parking Management System'
        ]
      },
      {
        name: 'Environmental Engineering and Water Resources',
        branch: 'Civil Engineering',
        overview: 'Design water supply, wastewater treatment, and environmental protection systems',
        advancedTopics: [
          'Water Treatment Plant Design',
          'Wastewater Treatment Technologies',
          'Solid Waste Management',
          'Air Pollution Control',
          'Environmental Impact Assessment',
          'Watershed Management',
          'Sustainable Urban Drainage Systems'
        ],
        projects: [
          'Design a Water Treatment Plant for a City',
          'Create a Wastewater Treatment System',
          'Develop a Rainwater Harvesting System',
          'Design a Solid Waste Management Plan',
          'Perform Environmental Impact Assessment for a Project'
        ]
      },
      
      // Electronics and Communication Engineering Courses
      {
        name: 'VLSI Design and Chip Architecture',
        branch: 'Electronics and Communication Engineering',
        overview: 'Design integrated circuits, semiconductor devices, and chip architectures',
        advancedTopics: [
          'Digital VLSI Design and Verilog/VHDL',
          'Analog and Mixed-Signal IC Design',
          'CMOS Technology and Fabrication',
          'FPGA Programming and Prototyping',
          'System-on-Chip (SoC) Design',
          'Low Power VLSI Design',
          'Physical Design and Layout'
        ],
        projects: [
          'Design a Microprocessor using Verilog',
          'Create an FPGA-based Signal Processing System',
          'Design a Low-Power Memory Circuit',
          'Implement a Digital Filter on FPGA',
          'Design an Application-Specific IC (ASIC)'
        ]
      },
      {
        name: 'Wireless Communication Systems',
        branch: 'Electronics and Communication Engineering',
        overview: 'Study modern wireless technologies, 5G networks, and communication protocols',
        advancedTopics: [
          '5G and Beyond Wireless Technologies',
          'Antenna Design and RF Engineering',
          'Digital Signal Processing for Communications',
          'Wireless Sensor Networks',
          'Satellite Communication Systems',
          'Optical Fiber Communication',
          'Network Security and Cryptography'
        ],
        projects: [
          'Design and Simulate a 5G Communication Link',
          'Build a Software Defined Radio (SDR) System',
          'Create a Wireless Sensor Network for IoT',
          'Design an Antenna for Specific Frequency Band',
          'Implement a Secure Communication Protocol'
        ]
      },
      {
        name: 'Signal Processing and Image Analysis',
        branch: 'Electronics and Communication Engineering',
        overview: 'Process signals, analyze images, and extract meaningful information',
        advancedTopics: [
          'Digital Image Processing and Computer Vision',
          'Speech and Audio Signal Processing',
          'Biomedical Signal Processing',
          'Machine Learning for Signal Analysis',
          'Video Processing and Compression',
          'Radar and Sonar Signal Processing',
          'Adaptive Filtering Techniques'
        ],
        projects: [
          'Build a Face Recognition System',
          'Create a Speech Recognition Application',
          'Develop a Medical Image Analysis Tool',
          'Build a Real-time Video Compression System',
          'Design an ECG Signal Processing and Diagnosis System'
        ]
      }
    ];

    for (const courseData of coursesData) {
      const course = await Course.create(courseData);
      console.log(`✓ Created course: ${course.name} (${course.branch})`);
    }

    console.log(`\n✅ Successfully seeded ${coursesData.length} courses for undergraduate students!`);
    console.log('\nNow restart your backend server to see all data.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connectDB().then(() => seedData());
