export const templates = {
    'basic': `\\documentclass[11pt,a4paper]{article}
    \\usepackage[utf8]{inputenc}
    \\usepackage[margin=0.75in]{geometry}
    \\usepackage{hyperref}
    \\usepackage{graphicx}
    \\usepackage{enumitem}
    
    \\begin{document}
    \\pagestyle{empty}
    
    % Header
    \\begin{center}
        {\\LARGE\\textbf{John Doe}}\\\\[0.2cm]
        123 Main Street, City, State 12345 \\\\
        Phone: (123) 456-7890 $|$ Email: john.doe@email.com $|$ LinkedIn: linkedin.com/in/johndoe
    \\end{center}
    
    \\hrule
    \\vspace{0.3cm}
    
    % Education
    \\section*{Education}
    \\textbf{University of Example} \\hfill {\\em City, State} \\\\
    Bachelor of Science in Computer Science \\hfill {\\em May 2022} \\\\
    GPA: 3.8/4.0
    
    \\vspace{0.3cm}
    
    % Experience
    \\section*{Professional Experience}
    \\textbf{Software Developer} \\hfill {\\em June 2022 - Present} \\\\
    {\\em Tech Company Inc.} \\hfill {\\em City, State} \\\\
    \\begin{itemize}[leftmargin=*]
        \\item Developed and maintained web applications using Vue.js and Node.js
        \\item Implemented responsive designs and improved site performance by 40\\%
        \\item Collaborated with cross-functional teams to deliver projects on schedule
    \\end{itemize}
    
    \\textbf{Web Development Intern} \\hfill {\\em May 2021 - August 2021} \\\\
    {\\em Start-up Labs} \\hfill {\\em City, State} \\\\
    \\begin{itemize}[leftmargin=*]
        \\item Assisted in developing front-end components using React.js
        \\item Participated in code reviews and implemented feedback
        \\item Created documentation for internal APIs
    \\end{itemize}
    
    \\vspace{0.3cm}
    
    % Skills
    \\section*{Skills}
    \\textbf{Languages:} JavaScript, HTML, CSS, Python, Java, SQL \\\\
    \\textbf{Frameworks/Libraries:} React.js, Vue.js, Node.js, Express.js \\\\
    \\textbf{Tools:} Git, Docker, AWS, Firebase, JIRA \\\\
    \\textbf{Databases:} MongoDB, MySQL, PostgreSQL
    
    \\vspace{0.3cm}
    
    % Projects
    \\section*{Projects}
    \\textbf{Personal Portfolio Website} \\\\
    \\begin{itemize}[leftmargin=*]
        \\item Designed and implemented a responsive portfolio website using HTML, CSS, and JavaScript
        \\item Integrated a contact form with backend validation using Node.js
        \\item Deployed on AWS with CI/CD pipeline
    \\end{itemize}
    
    \\textbf{Task Management Application} \\\\
    \\begin{itemize}[leftmargin=*]
        \\item Built a full-stack task management application using the MERN stack
        \\item Implemented user authentication with JWT
        \\item Created RESTful API endpoints for CRUD operations
    \\end{itemize}
    
    \\end{document}`,

    'moderncv': `\\documentclass[11pt,a4paper,sans]{moderncv}
    \\moderncvstyle{classic}
    \\moderncvcolor{blue}
    \\renewcommand{\\familydefault}{\\sfdefault}
    \\nopagenumbers{}
    \\usepackage[utf8]{inputenc}
    \\usepackage[margin=1.5cm]{geometry}
    \\name{John}{Doe}
    \\title{Software Developer}
    \\address{123 Main Street}{City, State 12345}{}
    \\phone[mobile]{(123) 456-7890}
    \\email{john.doe@email.com}
    \\social[linkedin]{johndoe}
    \\social[github]{johndoe}
    
    \\begin{document}
    \\makecvtitle
    \\section{Education}
    \\cventry{2018--2022}{Bachelor of Science in Computer Science}{University of Example}{City, State}{}{GPA: 3.8/4.0}
    \\section{Experience}
    \\cventry{Jun 2022--Present}{Software Developer}{Tech Company Inc.}{City, State}{}{
    \\begin{itemize}
    \\item Developed and maintained web applications using Vue.js and Node.js
    \\item Implemented responsive designs and improved site performance by 40\\%
    \\item Collaborated with cross-functional teams to deliver projects on schedule
    \\end{itemize}}
    \\cventry{May 2021--Aug 2021}{Web Development Intern}{Start-up Labs}{City, State}{}{
    \\begin{itemize}
    \\item Assisted in developing front-end components using React.js
    \\item Participated in code reviews and implemented feedback
    \\item Created documentation for internal APIs
    \\end{itemize}}
    \\section{Skills}
    \\cvitem{Languages}{JavaScript, HTML, CSS, Python, Java, SQL}
    \\cvitem{Frameworks}{React.js, Vue.js, Node.js, Express.js}
    \\cvitem{Tools}{Git, Docker, AWS, Firebase, JIRA}
    \\cvitem{Databases}{MongoDB, MySQL, PostgreSQL}
    \\section{Projects}
    \\cvitem{Personal Portfolio Website}{
    \\begin{itemize}
    \\item Designed and implemented a responsive portfolio website using HTML, CSS, and JavaScript
    \\item Integrated a contact form with backend validation using Node.js
    \\item Deployed on AWS with CI/CD pipeline
    \\end{itemize}}
    \\cvitem{Task Management Application}{
    \\begin{itemize}
    \\item Built a full-stack task management application using the MERN stack
    \\item Implemented user authentication with JWT
    \\item Created RESTful API endpoints for CRUD operations
    \\end{itemize}}
    \\section{Languages}
    \\cvitemwithcomment{English}{Native}{}
    \\cvitemwithcomment{Spanish}{Professional Proficiency}{}
    \\end{document}`,

    'test': `\\documentclass{article}
\\begin{document}
In a document there are different types of \\textbf{commands} 
that define the way the elements are displayed. This 
commands may insert special elements: $\\alpha\\ \\beta\\ \\Gamma$
\\end{document}`,

    'awesome-cv': `\\documentclass[11pt, a4paper]{awesome-cv}
    \\usepackage{fontawesome5}
    \\usepackage[utf8]{inputenc}
    \\geometry{left=1.0cm, top=0.8cm, right=1.0cm, bottom=0.8cm, footskip=0.5cm}
    \\name{John}{Doe}
    \\position{Software Developer}
    \\address{123 Main Street, City, State 12345}
    \\mobile{(123) 456-7890}
    \\email{john.doe@email.com}
    \\github{johndoe}
    \\linkedin{johndoe}
    \\colorlet{awesome}{awesome-skyblue}
    
    \\begin{document}
    \\makecvheader
    \\cvsection{Education}
    \\begin{cventries}
        \\cventry
        {Bachelor of Science in Computer Science}
        {University of Example}
        {City, State}
        {Aug 2018 - May 2022}
        {
            \\begin{cvitems}
                \\item {GPA: 3.8/4.0}
                \\item {Dean's List: All semesters}
            \\end{cvitems}
        }
    \\end{cventries}
    
    \\cvsection{Experience}
    \\begin{cventries}
        \\cventry
        {Software Developer}
        {Tech Company Inc.}
        {City, State}
        {Jun 2022 - Present}
        {
            \\begin{cvitems}
                \\item {Developed and maintained web applications using Vue.js and Node.js}
                \\item {Implemented responsive designs and improved site performance by 40\\%}
                \\item {Collaborated with cross-functional teams to deliver projects on schedule}
            \\end{cvitems}
        }
        \\cventry
        {Web Development Intern}
        {Start-up Labs}
        {City, State}
        {May 2021 - Aug 2021}
        {
            \\begin{cvitems}
                \\item {Assisted in developing front-end components using React.js}
                \\item {Participated in code reviews and implemented feedback}
                \\item {Created documentation for internal APIs}
            \\end{cvitems}
        }
    \\end{cventries}
    
    \\cvsection{Projects}
    \\begin{cventries}
        \\cventry
        {Personal Portfolio Website}
        {}
        {}
        {}
        {
            \\begin{cvitems}
                \\item {Designed and implemented a responsive portfolio website using HTML, CSS, and JavaScript}
                \\item {Integrated a contact form with backend validation using Node.js}
                \\item {Deployed on AWS with CI/CD pipeline}
            \\end{cvitems}
        }
        \\cventry
        {Task Management Application}
        {}
        {}
        {}
        {
            \\begin{cvitems}
                \\item {Built a full-stack task management application using the MERN stack}
                \\item {Implemented user authentication with JWT}
                \\item {Created RESTful API endpoints for CRUD operations}
            \\end{cvitems}
        }
    \\end{cventries}
    
    \\cvsection{Skills}
    \\cvskill{Languages}{JavaScript, HTML, CSS, Python, Java, SQL}
    \\cvskill{Frameworks}{React.js, Vue.js, Node.js, Express.js}
    \\cvskill{Tools}{Git, Docker, AWS, Firebase, JIRA}
    \\cvskill{Databases}{MongoDB, MySQL, PostgreSQL}
    
    \\cvsection{Languages}
    \\cvskill{English}{Native}
    \\cvskill{Spanish}{Professional Proficiency}
    
    \\end{document}`
};
