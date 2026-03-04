# 🎓 Gestion Formation Platform

![Project Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge)

> **A cutting-edge, responsive dashboard for managing employees, training sessions, and corporate participations, built with modern web technologies.**

---

## 🌟 Overview

**Gestion Formation** is a sophisticated Single Page Application (SPA) designed to streamline the administrative processes of corporate training management. It offers a seamless experience for administrators to track employee performance, manage training catalogs, and visualize participation data through an interactive and aesthetically pleasing interface.

Key architectural highlights include a robust **Redux** state management system, a stunning **Glassmorphism** UI design, and fully integrated **Dark/Light mode** capabilities.

---

## 🚀 Key Features

### 🎨 User Interface & Experience

- **Modern Glassmorphism Design:** A visually striking UI featuring translucent backgrounds, blur effects, and vibrant gradients.
- **Dark/Light Mode:** Fully integrated theme switcher that persists user preference using LocalStorage and Tailwind CSS v4 variables.
- **Animated Components:** Smooth page transitions and interactive elements powered by **Framer Motion**.
- **Responsive Layout:** A fluid grid system that adapts perfectly from desktop monitors to mobile devices.

### 🔐 Authentication & Security

- **Secure Login System:** Dedicated login interface with form validation and error handling.
- **Role-Based Access:** Protected routes ensure only authenticated users can access the dashboard.
- **Session Management:** Persistent login sessions using LocalStorage integration.

### 📊 Data Visualization & Analytics

- **Interactive Dashboard:** Real-time analytics featuring:
  - **Bar Charts:** Employee participation performance.
  - **Pie Charts:** Training distribution analysis.
  - **Radar Charts:** Skill balance and coverage.
  - **Area Charts:** Growth trends over time.
- **Smart Tooltips:** Custom-styled tooltips providing detailed insights on hover.

### 🛠 Core Functionality

- **Employee Management:** CRUD operations (Create, Read, Update, Delete) for employee records.
- **Training Catalog:** comprehensive management of training sessions with status tracking (Planned, In Progress, Completed).
- **Participation Tracking:** Complex filtering and linking between employees and training sessions.
- **Advanced Filtering:** Search and filter lists by multiple criteria (Search terms, status, dates).

---

## 🛠️ Tech Stack

| Category               | Technology                                                                                                     | Description                                           |
| :--------------------- | :------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)                     | React 18 with Functional Components & Hooks           |
| **State Management**   | ![Redux](https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white)                      | Redux Toolkit for global state application            |
| **Styling**            | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)  | Utility-first CSS framework (v4)                      |
| **Routing**            | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | React Router DOM v6 for client-side navigation        |
| **Animations**         | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)     | Production-ready animation library                    |
| **Charts**             | ![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=flat)                                           | Composable charting library built on React components |
| **Backend Mock**       | ![JSON Server](https://img.shields.io/badge/JSON_Server-333333?style=flat&logo=json&logoColor=white)           | Full fake REST API for prototyping                    |
| **Build Tool**         | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)                         | Next Generation Frontend Tooling                      |

---

## 📁 File Architecture

```bash
src/
├── 📂 app/                 # Redux store configuration
│   └── store.js
├── 📂 assets/              # Static assets (images, icons)
├── 📂 components/          # Reusable UI components
│   ├── Dashboard.jsx       # Main analytics hub
│   ├── Login.jsx           # Authentication interface
│   ├── SideBar.jsx         # Navigation with theme toggle
│   ├── TopBar.jsx          # Header with user profile
│   ├── EmployeeList.jsx    # Employee management view
│   ├── FormationList.jsx   # Training management view
│   └── ParticipationList.jsx # Enrollments view
├── 📂 features/            # Redux Slices (State Logic)
│   ├── authSlice.js        # Authentication state
│   ├── employeeSlice.js    # Employee data logic
│   ├── formationSlice.js   # Training data logic
│   └── participationSlice.js # Participation data logic
├── 📂 hooks/               # Custom React Hooks
│   └── useDarkMode.jsx     # Theme toggling logic
├── App.jsx                 # Main application component with routing
└── main.jsx               # Application entry point
```

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/OussousMohamed/Gestion--Formations.git
cd Gestion--Formations
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Mock Backend

This project uses `json-server` to simulate a real backend API. You need to run this in a separate terminal.

```bash
# Watch the data.json file on port 8585
npx json-server --watch data.json --port 8585
```

_Note: Ensure the port matches the API configuration in your slices (8585)._

### 4. Run the Application

In a new terminal window, start the React development server.

```bash
npm run dev
```

### 5. Access the Platform

Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

**Default Login Credentials:**

- **Email:** `oussous@gmail.com`
- **Password:** `123`

---

## 📸 UI Highlights

### Glassmorphism Dashboard

The dashboard utilizes a sophisticated glassmorphism effect, using background blur filters and semi-transparent layers to create depth and hierarchy.

### Dynamic Theme Switching

The application features a robust dark mode implementation. The state is managed via a custom hook (`useDarkMode`) and persisted in `localStorage`. Tailwind's dark modifier classes ensure every component transitions smoothly between themes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <strong>Mohamed Oussous</strong>
</p>
