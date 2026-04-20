// ======================
// PROFILE
// ======================
export const PROFILE = {
  name: "Aditya Pawan Nawal",
  email: "nawaladitya06@gmail.com",
  degree: "B.Sc. Information Technology",
  batch: "2026",
  dob: "06/01/2005",
  links: {
    linkedin: "https://www.linkedin.com/in/aditya-nawal",
    github: "https://github.com/nawaladitya06",
    portfolio: "https://nawaladitya06.github.io",
  },
};

// ======================
// EDUCATION
// ======================
export const EDUCATION = [
  {
    institution: "K. P. B. Hinduja College, Mumbai",
    degree: "Bachelor of Science in Information Technology",
    year: "2023–Present",
    score: "GPA: 6.5 / 10",
    link: "https://www.hindujacollege.edu.in/",
  },
  {
    institution: "Shankar Narayan College of Commerce, Mumbai",
    degree: "HSC",
    year: "2022-23",
    score: "75%",
    link: "https://sncollege.com/",
  },
  {
    institution: "St. Francis High School, Mumbai",
    degree: "SSC",
    year: "2020-21",
    score: "75%",
    link: "https://xaviersgroup.co.in/ssc/stfrancis-bhayandar-east/",
  },
];

// ======================
// PROJECTS
// ======================
export const PROJECTS = [
  {
    title: "Sweet Delights",
    desc: "AI-integrated full-stack e-commerce platform for custom cakes and cupcakes with advanced customization.",
    tech: ["MERN Stack", "AI Integration", "Tailwind"],
    year: "2026",
    size: "col-span-1 md:col-span-1",
    // FIX: Changed from array to single string
    img: "/projects/sweet-delights.png", 
    links: {
      github: "https://github.com/nawaladitya06/sweet-delights",
      demo: "https://sweet-delights-delta-henna.vercel.app/", 
    }
  },
  {
    title: "Educational Document App",
    desc: "Cross-platform mobile application for managing institutional documents with secure user onboarding.",
    tech: ["Flutter", "Dart", "Supabase", "Android Studio"],
    year: "2025",
    size: "col-span-1",
    img: "/projects/edu-doc.jpeg",
    links: {
      github: "https://github.com/Yug-joshi/Edu_Doc",
      demo: "", 
    }
  },
  {
    title: "UNICORN Fest Website",
    desc: "Website for the annual college fest, featuring event listings, ticket booking, and interactive UI.",
    tech: ["React.js", "Next.js", "Tailwind CSS"],
    year: "2025",
    size: "col-span-1",
    img: "/projects/unicorn-fest.png",
    links: {
      github: "https://github.com/nawaladitya06/UNICORN",
      demo: "https://unicorn-gules.vercel.app/",
    }
  },
  {
    title: "Real-Time Chat App",
    desc: "Full-stack real-time chat application with instant messaging, authentication, and chat rooms.",
    tech: ["React.js", "Node.js", "Socket.IO"],
    year: "2025",
    size: "col-span-1",
    // FIX: Added empty string to prevent "undefined" error
    img: "/projects/chat-app.png", 
    links: {
      github: "https://github.com/nawaladitya06/Projects/tree/main/Project/Real-Time%20Chat%20Application",
      demo: "",
    }
  },
  {
    title: "Rock Paper Scissors",
    desc: "Interactive browser-based game with real-time score tracking and responsive design.",
    tech: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    size: "col-span-1",
    img: "/projects/Xox.png",
    links: {
      github: "https://github.com/nawaladitya06/Projects/tree/main/Project/Rock%20Paper%20and%20Scissor",
      demo: "",
    }
  },
  {
    title: "To-Do List Android App",
    desc: "Native Android application built from scratch with complete task lifecycle management and clean UI.",
    tech: ["Java", "XML", "Android Studio"],
    year: "2025",
    size: "col-span-1",
    img: "/projects/todo-android.jpeg",
    links: {
      github: "",
      demo: "",
    }
  },
];

// ======================
// LEADERSHIP & VOLUNTEERING
// ======================
export const EXPERIENCE = [
  {
    role: "Head of Documentation Department",
    org: "National Service Scheme (NSS)",
    year: "2023 – 2025",
    desc: "Managed records and coordinated documentation for community service initiatives.",
  },
  {
    role: "Co-Head of Hospitality & Head of Finance",
    org: "Women Development Cell (WDC)",
    year: "2024 – 2026",
    desc: "Managed event logistics, finance, and cross-team collaboration for women empowerment programs.",
  },
  {
    role: "Co-Head of Documentation & Head of Technical Department",
    org: "Entrepreneurship Cell (E-Cell)",
    year: "2024 – 2026",
    desc: "Created documentation for startup initiatives and handled technical responsibilities including development of the UNICORN Fest website.",
  },
];

// ======================
// SKILLS (Now with URLs)
// ======================
export const SKILLS = {
  "Frontend Development": [
    { name: "XML", url: "https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction" },
    { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "React.js", url: "https://react.dev/" },
    { name: "Vite", url: "https://vitejs.dev/" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    { name: "Bootstrap", url: "https://getbootstrap.com/" },
  ],
  "Backend Development": [
    { name: "Node.js", url: "https://nodejs.org/" },
    { name: "Express.js", url: "https://expressjs.com/" },
    { name: "Django", url: "https://www.djangoproject.com/" },
    { name: "Flask", url: "https://flask.palletsprojects.com/" },
    { name: "RESTful APIs", url: "https://restfulapi.net/" },
    { name: "JWT Auth", url: "https://jwt.io/" },
  ],
  Databases: [
    { name: "MongoDB Atlas", url: "https://www.mongodb.com/atlas" },
    { name: "MySQL", url: "https://www.mysql.com/" },
    { name: "Supabase", url: "https://supabase.com/" },
  ],
  "Full-Stack & Web": [
    { name: "MERN Stack", url: "https://www.mongodb.com/mern-stack" },
    { name: "Client-Server", url: "https://en.wikipedia.org/wiki/Client%E2%80%93server_model" },
    { name: "API Integration", url: "https://aws.amazon.com/what-is/api-integration/" },
  ],
  "Cloud & DevOps": [
    { name: "Vercel", url: "https://vercel.com/" },
    { name: "Render", url: "https://render.com/" },
    { name: "GitHub Actions", url: "https://github.com/features/actions" },
    { name: "Docker", url: "https://www.docker.com/" },
  ],
  Languages: [
    { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Python", url: "https://www.python.org/" },
    { name: "Java", url: "https://www.java.com/" },
    { name: "C/C++", url: "https://isocpp.org/" },
    { name: "Dart", url: "https://dart.dev/" },
  ],
  Libraries: [
    { name: "NumPy", url: "https://numpy.org/" },
    { name: "Pandas", url: "https://pandas.pydata.org/" },
    { name: "Tkinter", url: "https://docs.python.org/3/library/tkinter.html" },
    { name: "Pygame", url: "https://www.pygame.org/" },
    { name: "Three.js", url: "https://threejs.org/" },
  ],
  "AI & Dev Tools": [
    { name: "ChatGPT", url: "https://chat.openai.com/" },
    { name: "Claude", url: "https://claude.ai/" },
    { name: "Gemini", url: "https://gemini.google.com/" },
    { name: "VS Code", url: "https://code.visualstudio.com/" },
    { name: "Figma", url: "https://www.figma.com/" },
    { name: "Android Studio", url: "https://developer.android.com/studio" },
  ],
};
