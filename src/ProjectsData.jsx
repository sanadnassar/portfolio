export const PROJECTS_DATA = [
  {
    id: 'repright',
    title: 'RepRight',
    subtitle: 'Artificial Intelligence Fitness App',
    description:
      'Squat exercise form analyzer built using Computer Vision, Streamlit for frontend and a Random Forest Classifier to evaluate your exercise form in real time.',
    metrics: [
      { label: 'Domain', value: 'Health and Fitness' },
      { label: 'Architecture', value: 'ML-Pipeline' },
      { label: 'Highlight', value: '90.74% Accuracy' },
    ],
    tech: ['OpenCV', 'MediaPipe', 'Scikit-Learn'],
    github: 'https://github.com/sanadnassar/RepRight',
  },
  {
    id: 'cryptolab',
    title: 'CryptoLab',
    subtitle: 'Cryptocurrency Trading Platform',
    description:
      'A desktop cryptocurrency mock-trading platform built in C++17 and Qt 6 featuring paper funding, live market tracking, order services, and portfolio dashboards.',
    metrics: [
      { label: 'Domain', value: 'Financial Services' },
      { label: 'Architecture', value: 'Event-Driven C++' },
      { label: 'Highlight', value: 'Live Order Engine' },
    ],
    tech: ['C++17', 'Qt 6', 'REST APIs'],
    github: 'https://github.com/AliElrafih/A2-AliElrafih-Group69',
  },
  {
    id: 'syncaid',
    title: 'SyncAid',
    subtitle: 'Hackathon Finalist Project',
    description:
      'An AI-powered healthcare triage and scheduling platform designed to prevent missed appointments, prioritize high-risk patients, and dynamically adapt clinic schedules in real time.',
    metrics: [
      { label: 'Domain', value: 'Healthcare' },
      { label: 'Architecture', value: 'Frontend' },
      { label: 'Highlight', value: 'Top 3 Placement' },
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/sanadnassar/SyncAid',
  },
  {
    id: 'datavalidator',
    title: 'Data Validation Tool',
    subtitle: 'Automated Database Validation',
    description:
      'Automated database validation pipeline built with Python, Pandas, and SQL to verify schema integrity, flag data anomalies, and generate reports across enterprise datasets.',
    metrics: [
      { label: 'Domain', value: 'Data Engineering' },
      { label: 'Architecture', value: 'Client-Server' },
      { label: 'Highlight', value: 'Report Generation' },
    ],
    tech: ['Python', 'Pyodbc', 'SQL'],
    github: null,
    isPrivate: true,
  },
  {
    id: 'paywallet',
    title: 'PayWallet',
    subtitle: 'Digital Banking Backend',
    description:
      'Containerized backend digital banking service built with Java 11 and PostgreSQL to manage wallet balances, transactional ledgers, and automated unit testing.',
    metrics: [
      { label: 'Domain', value: 'FinTech Banking' },
      { label: 'Architecture', value: 'Containerized Backend' },
      { label: 'Highlight', value: 'ACID Transactions' },
    ],
    tech: ['PostgreSQL', 'Maven', 'Docker Compose'],
    github: 'https://github.com/sanadnassar/PayWallet',
  },
]

export const EXPERIENCE_DATA = [
  {
    id: 'eastnets',
    title: 'Eastnets',
    subtitle: 'Software Development Intern',
    description:
      'Designed and developed an automated database validation pipeline using Python, Pyodbc, Pandas, and SQL to verify data defects and generate reports across enterprise datasets.',
    metrics: [
      { label: 'Domain', value: 'FinTech' },
      { label: 'From', value: 'June 2025' },
      { label: 'To', value: 'August 2025' },
    ],
    tech: ['Python', 'Pyodbc', 'SQL'],
    github: null,
  },
  {
    id: 'weap-team',
    title: 'Western Autopilot',
    subtitle: 'Frontend Software Developer',
    description:
      "Collaborated with the Western Engineering Autopilot web development team to design, build, and deploy the club’s official responsive web platform to showcase our autonomous driving project.",
    metrics: [
      { label: 'Domain', value: 'Frontend Development' },
      { label: 'From', value: 'September 2025' },
      { label: 'To', value: 'April 2026' },
    ],
    tech: ['React', 'TypeScript', 'Vite'],
    github: null,
  },
  {
    id: 'progresssoft',
    title: 'ProgressSoft',
    subtitle: 'Software Engineering Intern',
    description:
      'Engineered and containerized PayWallet, a backend digital banking service built with Java 11 and PostgreSQL to manage wallet balances and transactional ledgers.',
    metrics: [
      { label: 'Domain', value: 'Digital Banking' },
      { label: 'From', value: 'June 2026' },
      { label: 'To', value: 'July 2026' },
    ],
    tech: ['Java 11', 'Maven', 'Docker'],
    github: null,
  },
  {
    id: 'wcs-team',
    title: 'Western Cyber Society',
    subtitle: 'Lead Software Engineer',
    description:
      'Working on an open source quantum computing pipeline, responsible for integrating workflows, managing codebase, and helping developers to ensure project success.',
    metrics: [
      { label: 'Domain', value: 'Quantum Computing' },
      { label: 'From', value: 'September 2026' },
      { label: 'To', value: 'April 2027' },
    ],
    tech: ['PySCF', 'Qiskit', 'NumPy'],
    github: null,
  },
]