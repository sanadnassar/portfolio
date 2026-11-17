export const PROJECTS_DATA = [
  {
    id: 'repright',
    title: 'RepRight',
    subtitle: 'AI Pose Estimation',
    description:
      'AI-powered squat form analysis application utilizing MediaPipe pose estimation and a Random Forest Classifier to evaluate joint alignment in real time.',
    metrics: [
      { label: 'Model', value: 'Random Forest' },
      { label: 'Accuracy', value: '90.74%' },
      { label: 'Pipeline', value: 'Real-Time CV' },
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-Learn', 'Streamlit'],
    github: 'https://github.com/sanadnassar',
  },
  {
    id: 'cryptolab',
    title: 'CryptoLab',
    subtitle: 'Desktop Trading Platform',
    description:
      'Desktop cryptocurrency mock-trading platform built in C++17 and Qt 6 featuring paper funding, live market tracking, order services, and portfolio dashboards.',
    metrics: [
      { label: 'Core', value: 'C++17' },
      { label: 'Framework', value: 'Qt 6 Desktop' },
      { label: 'Build', value: 'CMake' },
    ],
    tech: ['C++17', 'Qt 6', 'CMake', 'REST APIs'],
    github: 'https://github.com/sanadnassar',
  },
  {
    id: 'syncaid',
    title: 'SyncAid',
    subtitle: 'WDS Spark Hackathon Finalist',
    description:
      'AI-powered community healthcare accessibility platform built to streamline patient intake and connect users with localized medical resources.',
    metrics: [
      { label: 'Award', value: 'Top 3 Finalist' },
      { label: 'Event', value: 'Spark Hackathon' },
      { label: 'Focus', value: 'Accessibility AI' },
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/sanadnassar',
  },
  {
    id: 'molequle',
    title: 'MoleQule',
    subtitle: 'Quantum Simulation Pipeline',
    description:
      'Open-source hybrid quantum-classical computing pipeline built with Qiskit and PySCF to simulate molecular orbitals and compute ground state energies.',
    metrics: [
      { label: 'Method', value: 'Hybrid VQE' },
      { label: 'Stack', value: 'Qiskit + PySCF' },
      { label: 'License', value: 'Open Source' },
    ],
    tech: ['Python', 'Qiskit', 'PySCF', 'NumPy'],
    github: 'https://github.com/sanadnassar',
  },
]