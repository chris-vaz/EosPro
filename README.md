# EosPro 🚀💼

EosPro is an automated WhatsApp job search chatbot that sends weekly job updates to users and provides a dashboard for tracking job search progress.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **WhatsApp Job Search Chatbot**: Automated job searches based on user profile (job title, location) and sends weekly updates.

- **Real-Time Dashboard**: Users can track and manage job searches in a responsive, user-friendly dashboard.

- **Admin Messaging**: Admin can send custom messages to all users, keeping them informed about new features and updates.

## Tech Stack
- **Backend**: Python, Rasa, Twilio API, SERP API, Firebase
- **Frontend**: Next.js, ShadCN UI, Firebase SDK
- **Database**: Firebase (real-time database)

## Getting Started
### Backend Setup
1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up API keys:
   - Obtain Twilio and SERP API keys and configure them in your environment.

### Frontend Setup
1. Install dependencies:
```bash
npm install
```

2. Configure Firebase SDK:
   - Set up Firebase configuration in your Next.js application.

## Running the Application
Start the Python app:
```bash
python app.py
```

Start the Next.js app:
```bash
npm run dev
```

## Installation
1. Clone the repository:
```bash
git clone https://github.com/chris-vaz/EosPro.git
```

2. Follow the steps in the [Getting Started](#getting-started) section to set up and run the application.

## Usage
- Interact with the WhatsApp chatbot to set up job search preferences.
- Use the dashboard to track job applications and receive weekly updates.

## Contributing
Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments
- Special thanks to the open-source community for the tools and libraries used in this project.
- Appreciation to the contributors who have helped build and improve EosPro.