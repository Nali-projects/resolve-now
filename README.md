
# ResolveNow: Online Complaint Registration and Management System

## Overview
ResolveNow is a web-based complaint registration and management system developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).  
The main objective of this project is to provide a digital platform where users can register their complaints online, track their progress, and communicate with the concerned authorities for resolution.  

This system helps in reducing manual work, improves communication between users and administrators, and ensures that every complaint is handled in a transparent and organized manner.

---

## Objectives
- To create an online platform for registering and managing complaints.
- To allow users to track the status of their complaints anytime.
- To enable administrators to efficiently monitor and resolve issues.
- To improve transparency and accountability in the complaint-handling process.
- To maintain a digital record of all complaints and responses for future reference.

---

## Key Features
### User Module
- Users can register and log in securely using JWT authentication.
- They can submit complaints with details like category, description, and optional attachments.
- Users can track the status of their complaints (Pending, In Progress, Resolved).
- A chat option is provided for direct communication with the admin.
- All past complaints are stored and viewable in the user’s dashboard.

### Admin Module
- Admins can log in securely and manage complaints through a dashboard.
- Complaints can be viewed, filtered, and updated based on their status.
- Admins can send messages or replies to users regarding their complaints.
- Analytics and statistics are provided for better management and reporting.

---

## Technologies Used
| Component | Technology |
|------------|-------------|
| Frontend | React.js, HTML5, CSS3, JavaScript (ES6) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JSON Web Token (JWT) |
| Hosting  |vercel / Render |
| Version Control | Git and GitHub |

---

## System Design
The system follows a three-tier architecture:

1. **Frontend:**  
   Developed using React.js, it handles user interaction and displays complaint information dynamically.

2. **Backend:**  
   Built using Node.js and Express.js, it manages APIs, routes, and server-side logic.

3. **Database:**  
   MongoDB is used to store user details, complaints, and communication records in a structured and secure manner.

---

## Installation and Setup

### Step 1: Clone the Repository
```bash
git clone  https://github.com/Nali-projects/resolve-now.git
cd resolvenow
Step 2: Setup Backend
cd server
npm install
Create a .env file inside the server folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the backend server:

npm start
Step 3: Setup Frontend
cd ../client
npm install
npm start
Step 4: Access the Application
Open your browser and go to:

http://localhost:3000
Modules
Module	Description
User Authentication	Secure login and registration using JWT
Complaint Management	Users can submit and track their complaints
Admin Dashboard	Admins can manage, filter, and resolve complaints
Messaging System	Real-time chat between users and admin
Reports & Analytics	View statistics related to complaints
Future Enhancements
Integration of email and SMS notifications for updates.

Mobile application using React Native.

AI-based complaint categorization and priority setting.

Multi-level admin roles for large organizations.

Graphical reports and dashboards for performance tracking.

Conclusion
ResolveNow is developed with the aim of simplifying the complaint management process by using modern web technologies.
The system makes complaint handling faster, more efficient, and transparent.
It can be implemented in educational institutions, organizations, or public service departments to ensure that issues are resolved promptly and effectively.

Project Developed By
Name: Nali Kusuma
Project Title: ResolveNow – Online Complaint Registration and Management System
Technology Used: MERN Stack (MongoDB, Express.js, React.js, Node.js)
Institution: [Your College Name]
Department: Computer Science and Engineering
Academic Year: 2025



