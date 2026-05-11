-- Seed: All Skills with categories and URLs
-- Run with: npx wrangler d1 execute portfolio-db --remote --file=./scripts/seed-skills.sql

-- Clear existing skills (optional - comment out if you want to keep existing)
-- DELETE FROM skills;

-- 1. Frontend Development
INSERT INTO skills (category, name, url, level) VALUES
('Frontend Development', 'HTML5', 'https://developer.mozilla.org/en-US/docs/Web/HTML', 92),
('Frontend Development', 'CSS3', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 90),
('Frontend Development', 'JavaScript (ES6+)', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 90),
('Frontend Development', 'React.js', 'https://react.dev', 88),
('Frontend Development', 'Vite', 'https://vitejs.dev', 82),
('Frontend Development', 'Tailwind CSS', 'https://tailwindcss.com', 88),
('Frontend Development', 'Bootstrap', 'https://getbootstrap.com', 80),
('Frontend Development', 'TypeScript', 'https://www.typescriptlang.org', 82),
('Frontend Development', 'Next.js', 'https://nextjs.org', 85),
('Frontend Development', 'Framer Motion', 'https://www.framer.com/motion', 80),
('Frontend Development', 'Responsive Design', 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design', 90),
('Frontend Development', 'Shadcn UI', 'https://ui.shadcn.com', 78),
('Frontend Development', 'Material UI', 'https://mui.com', 75),
('Frontend Development', 'Chakra UI', 'https://chakra-ui.com', 72);

-- 2. Backend Development
INSERT INTO skills (category, name, url, level) VALUES
('Backend Development', 'Node.js', 'https://nodejs.org', 85),
('Backend Development', 'Express.js', 'https://expressjs.com', 83),
('Backend Development', 'Django', 'https://www.djangoproject.com', 72),
('Backend Development', 'Flask', 'https://flask.palletsprojects.com', 70),
('Backend Development', 'REST APIs', 'https://restfulapi.net', 88),
('Backend Development', 'JWT Authentication', 'https://jwt.io', 82),
('Backend Development', 'WebSockets / Socket.io', 'https://socket.io', 78),
('Backend Development', 'Authentication & Authorization', 'https://oauth.net', 80),
('Backend Development', 'MVC Architecture', 'https://developer.mozilla.org/en-US/docs/Glossary/MVC', 82),
('Backend Development', 'API Security', 'https://owasp.org/www-project-api-security', 75),
('Backend Development', 'Rate Limiting', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429', 72),
('Backend Development', 'Prisma ORM', 'https://www.prisma.io', 80),
('Backend Development', 'Server-side Rendering (SSR)', 'https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering', 82),
('Backend Development', 'Microservices Basics', 'https://microservices.io', 65);

-- 3. Databases & Storage
INSERT INTO skills (category, name, url, level) VALUES
('Databases & Storage', 'MongoDB Atlas', 'https://www.mongodb.com/atlas', 83),
('Databases & Storage', 'MySQL', 'https://www.mysql.com', 78),
('Databases & Storage', 'Supabase', 'https://supabase.com', 80),
('Databases & Storage', 'Firebase', 'https://firebase.google.com', 82),
('Databases & Storage', 'PostgreSQL', 'https://www.postgresql.org', 75),
('Databases & Storage', 'Database Design', 'https://www.lucidchart.com/pages/database-diagram/how-to-draw-entity-relationship-diagrams', 78),
('Databases & Storage', 'Mongoose', 'https://mongoosejs.com', 80),
('Databases & Storage', 'Prisma', 'https://www.prisma.io', 80),
('Databases & Storage', 'Drizzle ORM', 'https://orm.drizzle.team', 75),
('Databases & Storage', 'Cloudflare D1', 'https://developers.cloudflare.com/d1', 72);

-- 4. Full-Stack Development
INSERT INTO skills (category, name, url, level) VALUES
('Full-Stack Development', 'MERN Stack', 'https://www.mongodb.com/mern-stack', 85),
('Full-Stack Development', 'Client-Server Architecture', 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview', 82),
('Full-Stack Development', 'API Integration', 'https://developer.mozilla.org/en-US/docs/Web/API', 85),
('Full-Stack Development', 'Next.js Full Stack', 'https://nextjs.org', 83),
('Full-Stack Development', 'Authentication Flows', 'https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization', 80),
('Full-Stack Development', 'CRUD Systems', 'https://developer.mozilla.org/en-US/docs/Glossary/CRUD', 88),
('Full-Stack Development', 'Payment Gateway Integration', 'https://stripe.com/docs', 70),
('Full-Stack Development', 'File Upload Systems', 'https://developer.mozilla.org/en-US/docs/Web/API/File_API', 75),
('Full-Stack Development', 'Real-time Applications', 'https://socket.io', 75),
('Full-Stack Development', 'Role-based Access Control (RBAC)', 'https://auth0.com/docs/manage-users/access-control/rbac', 78);

-- 5. Cloud, DevOps & Deployment
INSERT INTO skills (category, name, url, level) VALUES
('Cloud, DevOps & Deployment', 'Vercel', 'https://vercel.com', 85),
('Cloud, DevOps & Deployment', 'Render', 'https://render.com', 80),
('Cloud, DevOps & Deployment', 'GitHub Actions', 'https://github.com/features/actions', 75),
('Cloud, DevOps & Deployment', 'Docker', 'https://www.docker.com', 68),
('Cloud, DevOps & Deployment', 'Cloudflare Pages/Workers', 'https://pages.cloudflare.com', 80),
('Cloud, DevOps & Deployment', 'CI/CD Pipelines', 'https://www.redhat.com/en/topics/devops/what-is-ci-cd', 72),
('Cloud, DevOps & Deployment', 'Nginx Basics', 'https://nginx.org', 62),
('Cloud, DevOps & Deployment', 'Linux Server Management', 'https://www.linux.org', 65),
('Cloud, DevOps & Deployment', 'Environment Variables & Secrets', 'https://www.doppler.com', 82),
('Cloud, DevOps & Deployment', 'AWS Basics', 'https://aws.amazon.com', 60),
('Cloud, DevOps & Deployment', 'Git & GitHub', 'https://github.com', 90);

-- 6. Programming Languages
INSERT INTO skills (category, name, url, level) VALUES
('Programming Languages', 'JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 90),
('Programming Languages', 'Python', 'https://www.python.org', 78),
('Programming Languages', 'Java', 'https://www.java.com', 70),
('Programming Languages', 'C/C++', 'https://isocpp.org', 68),
('Programming Languages', 'Dart', 'https://dart.dev', 75),
('Programming Languages', 'TypeScript', 'https://www.typescriptlang.org', 82),
('Programming Languages', 'SQL', 'https://www.w3schools.com/sql', 78),
('Programming Languages', 'Bash/Shell Scripting', 'https://www.gnu.org/software/bash', 65);

-- 7. AI & Developer Tools
INSERT INTO skills (category, name, url, level) VALUES
('AI & Developer Tools', 'ChatGPT', 'https://openai.com/chatgpt', 88),
('AI & Developer Tools', 'Claude', 'https://claude.ai', 85),
('AI & Developer Tools', 'Gemini', 'https://gemini.google.com', 85),
('AI & Developer Tools', 'VS Code', 'https://code.visualstudio.com', 92),
('AI & Developer Tools', 'Figma', 'https://www.figma.com', 80),
('AI & Developer Tools', 'Android Studio', 'https://developer.android.com/studio', 72),
('AI & Developer Tools', 'GitHub Copilot', 'https://github.com/features/copilot', 85),
('AI & Developer Tools', 'Postman', 'https://www.postman.com', 85),
('AI & Developer Tools', 'Bruno API Client', 'https://www.usebruno.com', 78),
('AI & Developer Tools', 'Cursor AI', 'https://www.cursor.com', 82),
('AI & Developer Tools', 'Firebase Console', 'https://console.firebase.google.com', 80),
('AI & Developer Tools', 'Chrome DevTools', 'https://developer.chrome.com/docs/devtools', 85),
('AI & Developer Tools', 'Notion', 'https://www.notion.so', 80);

-- 8. Mobile Development
INSERT INTO skills (category, name, url, level) VALUES
('Mobile Development', 'Flutter', 'https://flutter.dev', 78),
('Mobile Development', 'Dart', 'https://dart.dev', 75),
('Mobile Development', 'Responsive Mobile UI', 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps', 82),
('Mobile Development', 'Firebase Integration', 'https://firebase.google.com/docs', 80);

-- 9. UI/UX & Design
INSERT INTO skills (category, name, url, level) VALUES
('UI/UX & Design', 'Wireframing', 'https://www.figma.com', 80),
('UI/UX & Design', 'Prototyping', 'https://www.figma.com', 78),
('UI/UX & Design', 'Design Systems', 'https://m3.material.io', 75),
('UI/UX & Design', 'Typography', 'https://fonts.google.com', 78),
('UI/UX & Design', 'Colour Theory', 'https://color.adobe.com', 75),
('UI/UX & Design', 'Glassmorphism / Modern UI', 'https://hype4.academy/tools/glassmorphism-generator', 82),
('UI/UX & Design', 'Motion UI', 'https://www.framer.com/motion', 80);

-- 10. Core Computer Science Concepts
INSERT INTO skills (category, name, url, level) VALUES
('Core CS Concepts', 'Data Structures & Algorithms', 'https://www.geeksforgeeks.org/data-structures', 78),
('Core CS Concepts', 'OOP Concepts', 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java', 82),
('Core CS Concepts', 'DBMS', 'https://www.geeksforgeeks.org/dbms', 75),
('Core CS Concepts', 'Operating Systems Basics', 'https://www.geeksforgeeks.org/operating-systems', 70),
('Core CS Concepts', 'Computer Networks', 'https://www.geeksforgeeks.org/computer-network-tutorials', 72),
('Core CS Concepts', 'Git Version Control', 'https://git-scm.com', 88),
('Core CS Concepts', 'HTTP/HTTPS', 'https://developer.mozilla.org/en-US/docs/Web/HTTP', 82),
('Core CS Concepts', 'Authentication & Security', 'https://owasp.org', 78);
