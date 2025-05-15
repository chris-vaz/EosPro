export const templates = {
    'basic': `\\documentclass{article}
  \\begin{document}
  
  \\begin{center}
      {\\LARGE \\textbf{John Doe}}\\\\
      123 Main Street, City, State 12345 \\\\
      Phone: (123) 456-7890 $\\mid$ Email: john.doe@email.com $\\mid$ LinkedIn: linkedin.com/in/johndoe
  \\end{center}
  
  \\hrule
  \\vspace{0.3cm}
  
  \\section*{Education}
  \\textbf{University of Example}, City, State \\\\
  Bachelor of Science in Computer Science, May 2022 \\\\
  GPA: 3.8/4.0
  
  \\section*{Professional Experience}
  \\textbf{Software Developer}, Tech Company Inc., City, State \\\\
  June 2022 -- Present
  \\begin{itemize}
    \\item Developed and maintained web applications using Vue.js and Node.js
    \\item Improved site performance by 40\\%
    \\item Collaborated with cross-functional teams
  \\end{itemize}
  
  \\textbf{Web Development Intern}, Start-up Labs, City, State \\\\
  May 2021 -- August 2021
  \\begin{itemize}
    \\item Developed front-end components using React.js
    \\item Participated in code reviews and implemented feedback
    \\item Created documentation for internal APIs
  \\end{itemize}
  
  \\section*{Skills}
  \\textbf{Languages:} JavaScript, HTML, CSS, Python, Java, SQL \\\\
  \\textbf{Frameworks:} React.js, Vue.js, Node.js, Express.js \\\\
  \\textbf{Tools:} Git, Docker, AWS, Firebase, JIRA \\\\
  \\textbf{Databases:} MongoDB, MySQL, PostgreSQL
  
  \\section*{Projects}
  \\textbf{Personal Portfolio Website}
  \\begin{itemize}
    \\item Responsive website using HTML, CSS, JavaScript
    \\item Backend with Node.js and deployed on AWS
  \\end{itemize}
  
  \\textbf{Task Management App}
  \\begin{itemize}
    \\item Full-stack MERN application with JWT authentication
    \\item Created RESTful API endpoints for CRUD operations
  \\end{itemize}
  
  \\end{document}`,

    'moderncv': `\\documentclass{article}
  \\begin{document}
  
  \\begin{center}
      {\\LARGE \\textbf{John Doe}}\\\\
      Software Developer \\\\
      123 Main Street, City, State 12345 \\\\
      Phone: (123) 456-7890 \\\\
      Email: john.doe@email.com \\\\
      LinkedIn: linkedin.com/in/johndoe \\\\
      GitHub: github.com/johndoe
  \\end{center}
  
  \\section*{Education}
  Bachelor of Science in Computer Science \\\\
  University of Example, City, State \\\\
  2018--2022, GPA: 3.8/4.0
  
  \\section*{Experience}
  \\textbf{Software Developer}, Tech Company Inc., City, State \\\\
  June 2022 -- Present
  \\begin{itemize}
    \\item Developed and maintained web applications using Vue.js and Node.js
    \\item Improved site performance by 40\\%
    \\item Collaborated with cross-functional teams
  \\end{itemize}
  
  \\textbf{Web Development Intern}, Start-up Labs, City, State \\\\
  May 2021 -- August 2021
  \\begin{itemize}
    \\item Assisted in developing front-end components using React.js
    \\item Participated in code reviews and implemented feedback
    \\item Created documentation for internal APIs
  \\end{itemize}
  
  \\section*{Skills}
  \\textbf{Languages:} JavaScript, HTML, CSS, Python, Java, SQL \\\\
  \\textbf{Frameworks:} React.js, Vue.js, Node.js, Express.js \\\\
  \\textbf{Tools:} Git, Docker, AWS, Firebase, JIRA \\\\
  \\textbf{Databases:} MongoDB, MySQL, PostgreSQL
  
  \\section*{Projects}
  \\textbf{Personal Portfolio Website}
  \\begin{itemize}
    \\item Responsive website using HTML, CSS, JavaScript
    \\item Backend with Node.js and deployed on AWS
  \\end{itemize}
  
  \\textbf{Task Management Application}
  \\begin{itemize}
    \\item Full-stack MERN application with JWT authentication
    \\item Created RESTful API endpoints for CRUD operations
  \\end{itemize}
  
  \\section*{Languages}
  English: Native \\\\
  Spanish: Professional Proficiency
  
  \\end{document}`,

    'test2working': `\\documentclass{article}
  \\begin{document}
  
  \\begin{center}
      {\\LARGE \\textbf{John Doe}}\\\\
      \\textit{Software Developer} \\\\
      123 Main Street, City, State 12345 \\\\
      Mobile: (123) 456-7890 \\\\
      Email: john.doe@email.com \\\\
      LinkedIn: johndoe \quad GitHub: johndoe
  \\end{center}
  
  \\section*{Education}
  Bachelor of Science in Computer Science, University of Example, City, State \\\\
  2018--2022 \hfill GPA: 3.8/4.0
  
  \\section*{Experience}
  \\textbf{Software Developer}, Tech Company Inc., City, State \\\\
  Jun 2022 -- Present
  \\begin{itemize}
    \\item Developed and maintained web applications using Vue.js and Node.js
    \\item Improved site performance by 40\\%
    \\item Collaborated with cross-functional teams
  \\end{itemize}
  
  \\textbf{Web Development Intern}, Start-up Labs, City, State \\\\
  May 2021 -- Aug 2021
  \\begin{itemize}
    \\item Developed front-end components using React.js
    \\item Participated in code reviews
    \\item Created documentation for internal APIs
  \\end{itemize}
  
  \\section*{Skills}
  \\textbf{Languages:} JavaScript, HTML, CSS, Python, Java, SQL \\\\
  \\textbf{Frameworks:} React.js, Vue.js, Node.js, Express.js \\\\
  \\textbf{Tools:} Git, Docker, AWS, Firebase, JIRA \\\\
  \\textbf{Databases:} MongoDB, MySQL, PostgreSQL
  
  \\section*{Projects}
  \\textbf{Personal Portfolio Website}
  \\begin{itemize}
    \\item Responsive website using HTML, CSS, JavaScript
    \\item Backend with Node.js and deployed with AWS CI/CD
  \\end{itemize}
  
  \\textbf{Task Management App}
  \\begin{itemize}
    \\item Full-stack MERN application with JWT authentication
    \\item Created RESTful API endpoints for CRUD operations
  \\end{itemize}
  
  \\section*{Languages}
  \\textbf{English:} Native \\\\
  \\textbf{Spanish:} Professional Proficiency
  
  \\end{document}`,

    'test': `\\documentclass{article}
  \\begin{document}
  In a document there are different types of \\textbf{commands} 
  that define the way the elements are displayed. This 
  commands may insert special elements: $\\alpha\\ \\beta\\ \\Gamma$
  \\end{document}`,

    'awesome-cv': `\\documentclass{article}
  \\begin{document}
  
  \\begin{center}
      {\\LARGE \\textbf{John Doe}} \\\\
      Software Developer \\\\
      123 Main Street, City, State 12345 \\\\
      (123) 456-7890 \\\\
      Email: john.doe@email.com \\\\
      GitHub: github.com/johndoe \\\\
      LinkedIn: linkedin.com/in/johndoe
  \\end{center}
  
  \\section*{Education}
  Bachelor of Science in Computer Science \\\\
  University of Example, City, State \\\\
  Aug 2018 - May 2022 \\\\
  GPA: 3.8/4.0
  
  \\section*{Experience}
  \\textbf{Software Developer}, Tech Company Inc. \\\\
  Jun 2022 - Present
  \\begin{itemize}
    \\item Developed and maintained web applications using Vue.js and Node.js
    \\item Improved site performance by 40\\%
    \\item Collaborated with cross-functional teams
  \\end{itemize}
  
  \\textbf{Web Development Intern}, Start-up Labs \\\\
  May 2021 - Aug 2021
  \\begin{itemize}
    \\item Assisted in developing React.js components
    \\item Participated in code reviews
    \\item Created API documentation
  \\end{itemize}
  
  \\section*{Projects}
  \\textbf{Personal Portfolio Website}
  \\begin{itemize}
    \\item HTML, CSS, JavaScript
    \\item Node.js backend, deployed with AWS CI/CD
  \\end{itemize}
  
  \\textbf{Task Management App}
  \\begin{itemize}
    \\item Full-stack MERN app with JWT
    \\item RESTful API for tasks
  \\end{itemize}
  
  \\section*{Skills}
  Languages: JavaScript, HTML, CSS, Python, Java, SQL \\\\
  Frameworks: React.js, Vue.js, Node.js, Express.js \\\\
  Tools: Git, Docker, AWS, Firebase, JIRA \\\\
  Databases: MongoDB, MySQL, PostgreSQL
  
  \\section*{Languages}
  English: Native \\\\
  Spanish: Professional Proficiency
  
  \\end{document}`
};
