const projects = [
  {
    id: 1,
    title: 'Full Stack E-Commerce Platform',
    description:
      'A production-ready e-commerce platform with secure payment integration, real-time inventory management, and an admin dashboard. Built with React, Node.js, and MySQL for high-performance data handling.',
    longDescription:
      'This comprehensive e-commerce solution features a responsive storefront with advanced product filtering, search, and sorting capabilities. The backend is powered by Node.js with Express, implementing JWT authentication, role-based access control, and Stripe payment processing. MySQL handles product catalogs, user accounts, order history, and inventory tracking with optimized queries. The admin panel provides real-time analytics, order management, and bulk product operations. Fully containerized with Docker for seamless deployment.',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MySQL', 'Express', 'Stripe', 'JWT', 'Docker'],
    images: [
      'https://picsum.photos/seed/ecommerce1/800/500',
      'https://picsum.photos/seed/ecommerce2/800/500',
      'https://picsum.photos/seed/ecommerce3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Live',
    featured: true,
    year: 2025,
  },
  {
    id: 2,
    title: 'AI Image Classifier',
    description:
      'A deep learning–powered image classification system trained on custom datasets, achieving 94%+ accuracy. Features a drag-and-drop web interface with real-time predictions and confidence scores.',
    longDescription:
      'Built using TensorFlow and Keras, this project implements a Convolutional Neural Network (CNN) architecture with transfer learning from ResNet50. The model was trained on a curated dataset of 50,000+ images across 20 categories, utilizing data augmentation, dropout regularization, and learning rate scheduling to maximize accuracy. The Flask API serves predictions in real-time, while the React frontend offers an intuitive drag-and-drop interface with visual confidence breakdowns, prediction history, and batch processing capabilities.',
    category: 'AI/ML',
    tags: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Flask', 'React', 'Deep Learning'],
    images: [
      'https://picsum.photos/seed/aiclassifier1/800/500',
      'https://picsum.photos/seed/aiclassifier2/800/500',
      'https://picsum.photos/seed/aiclassifier3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Open Source',
    featured: true,
    year: 2024,
  },
  {
    id: 3,
    title: 'Penetration Testing Toolkit',
    description:
      'An automated penetration testing framework with modules for network scanning, vulnerability assessment, and report generation. Designed for ethical hackers and security professionals.',
    longDescription:
      'This modular security toolkit automates common penetration testing workflows, including port scanning, service enumeration, vulnerability detection, and exploit suggestion. Built in Python with Scapy for packet manipulation and Nmap integration for network discovery, it features an interactive CLI with color-coded output and structured JSON/PDF reporting. Modules cover web application testing (SQL injection, XSS, CSRF detection), network analysis, brute-force testing, and OWASP Top 10 vulnerability checks. All testing is performed within authorized scope with built-in safeguards.',
    category: 'Security',
    tags: ['Python', 'Cybersecurity', 'Nmap', 'Scapy', 'OWASP', 'Ethical Hacking'],
    images: [
      'https://picsum.photos/seed/pentest1/800/500',
      'https://picsum.photos/seed/pentest2/800/500',
      'https://picsum.photos/seed/pentest3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Open Source',
    featured: true,
    year: 2024,
  },
  {
    id: 4,
    title: 'Real-Time Chat Application',
    description:
      'A feature-rich real-time messaging platform with private and group chats, file sharing, message reactions, and typing indicators. Powered by Socket.io for instant communication.',
    longDescription:
      'This real-time chat application leverages Socket.io for bidirectional WebSocket communication, delivering sub-100ms message delivery. Features include one-on-one messaging, group channels, file/image sharing with drag-and-drop, message reactions, read receipts, typing indicators, and online presence tracking. The React frontend implements an optimistic UI pattern for instant user feedback, while the Node.js backend handles connection management, message persistence in MySQL, and push notifications. Includes end-to-end encryption for private conversations.',
    category: 'Web',
    tags: ['React', 'Node.js', 'Socket.io', 'MySQL', 'WebSockets', 'Express'],
    images: [
      'https://picsum.photos/seed/chatapp1/800/500',
      'https://picsum.photos/seed/chatapp2/800/500',
      'https://picsum.photos/seed/chatapp3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Live',
    featured: true,
    year: 2025,
  },
  {
    id: 5,
    title: 'ML Price Predictor',
    description:
      'A machine learning model that predicts real estate prices using ensemble methods, achieving an R² score of 0.91. Includes interactive data visualizations and a web-based prediction interface.',
    longDescription:
      'This project applies advanced regression techniques — including Random Forest, Gradient Boosting, and XGBoost — to predict real estate prices based on 15+ features such as location, square footage, amenities, and market trends. Data preprocessing includes feature engineering, outlier removal, and one-hot encoding. The Scikit-learn pipeline automates model selection and hyperparameter tuning via GridSearchCV. A Streamlit dashboard provides interactive visualizations (Plotly), feature importance charts, and a user-friendly prediction form that returns price estimates with confidence intervals.',
    category: 'AI/ML',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'XGBoost', 'Streamlit', 'Plotly'],
    images: [
      'https://picsum.photos/seed/predictor1/800/500',
      'https://picsum.photos/seed/predictor2/800/500',
      'https://picsum.photos/seed/predictor3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Open Source',
    featured: false,
    year: 2024,
  },
  {
    id: 6,
    title: 'Portfolio CMS Dashboard',
    description:
      'A custom content management system for managing portfolio projects, blogs, and analytics. Features a drag-and-drop interface, rich text editor, and real-time content preview.',
    longDescription:
      'This full-stack CMS is purpose-built for developers and creatives to manage their portfolio content without touching code. The React-based admin panel features a drag-and-drop project reordering system, a Markdown/WYSIWYG rich text editor, image upload with automatic optimization, and a real-time preview panel. The Node.js API implements CRUD operations with validation, image processing via Sharp, and role-based authentication. MySQL stores structured content with full-text search support. Includes SEO metadata management, analytics integration, and one-click deployment.',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MySQL', 'Express', 'JWT', 'Rich Text Editor'],
    images: [
      'https://picsum.photos/seed/cms1/800/500',
      'https://picsum.photos/seed/cms2/800/500',
      'https://picsum.photos/seed/cms3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'In Progress',
    featured: false,
    year: 2025,
  },
  {
    id: 7,
    title: 'Network Security Scanner',
    description:
      'An intelligent network vulnerability scanner that maps network topology, identifies open services, and flags potential security risks with severity ratings and remediation suggestions.',
    longDescription:
      'This Python-based network security tool performs comprehensive scans across local and remote networks. It combines ARP scanning for host discovery, TCP/UDP port scanning with service fingerprinting, and CVE database lookups to identify known vulnerabilities. The tool maps network topology visually, detects rogue devices, and identifies misconfigured services. Reports are generated in multiple formats (HTML, JSON, CSV) with color-coded severity ratings (Critical, High, Medium, Low) and actionable remediation guidance. Integrates with the National Vulnerability Database API for real-time CVE data.',
    category: 'Security',
    tags: ['Python', 'Networking', 'Scapy', 'CVE', 'Linux', 'Cybersecurity'],
    images: [
      'https://picsum.photos/seed/netscan1/800/500',
      'https://picsum.photos/seed/netscan2/800/500',
      'https://picsum.photos/seed/netscan3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Open Source',
    featured: false,
    year: 2023,
  },
  {
    id: 8,
    title: 'React Analytics Dashboard',
    description:
      'A responsive analytics dashboard featuring interactive charts, real-time data widgets, dark/light themes, and customizable KPI cards. Connects to MySQL for live business intelligence.',
    longDescription:
      'This data-driven dashboard application visualizes business metrics through an array of interactive charts (line, bar, pie, area, heatmap) powered by Recharts and Chart.js. Features include customizable KPI cards with trend indicators, date range filtering, CSV/PDF export, real-time auto-refresh, and a responsive grid layout that users can rearrange. The Node.js backend aggregates data from MySQL with efficient queries and caching via Redis. Supports dark and light themes with smooth transitions, and includes a notification center for metric alerts and threshold triggers.',
    category: 'Web',
    tags: ['React', 'Node.js', 'MySQL', 'Recharts', 'Chart.js', 'Redis'],
    images: [
      'https://picsum.photos/seed/dashboard1/800/500',
      'https://picsum.photos/seed/dashboard2/800/500',
      'https://picsum.photos/seed/dashboard3/800/500',
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Live',
    featured: false,
    year: 2025,
  },
];

export default projects;
