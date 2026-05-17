# 📝 Notes App – MERN Stack Notes Application

A full-stack Notes Application built using React, Vite, Node.js, Express, and MongoDB with secure Google Authentication using Google Identity Services (GIS).

---

# 🚀 Live Demo

Frontend: https://notes-app-two-red.vercel.app

Backend API: https://notes-app-v6r8.onrender.com

---

# 📂 Project Structure

```bash
notes-app/
│
├── frontend/      # Frontend (React + Vite)
├── backend/      # Backend (Node.js + Express)
└── README.md
```

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Toastify

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Authentication

* Google Identity Services (GIS)

---

# ✨ Features

* Google Authentication
* Create Notes
* Update Notes
* Delete Notes
* JWT Protected Routes
* Responsive UI
* Toast Notifications

---

# ⚙️ Environment Variables

## Backend `.env`

```env
MONGODB_PASSWORD=your_password
DATABASE_USER_NAME=your_username
DATABASE_NAME=your_database_name
DB_CLUSTER_URL=your_cluster_url
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Frontend `.env`

```env
VITE_BASE_API_END_POINT=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_OAUTH_SCRIPT=https://accounts.google.com/gsi/client
```

---

# 🔧 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/Notes-App.git
cd Notes-App
```

---

# ▶️ Backend Setup

```bash
cd notes-web-app-server
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# ▶️ Frontend Setup

```bash
cd notes-web-app-client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔐 Google OAuth Setup

## Step 1: Create Google Cloud Project

Go to:
https://console.cloud.google.com/

Create a new project.

---

## Step 2: Configure OAuth Consent Screen

* Choose: External
* Add your Gmail as Test User
* Save & Continue

---

## Step 3: Create OAuth Credentials

Go to:

Credentials → Create Credentials → OAuth Client ID

Application Type:

* Web Application

Authorized JavaScript Origins:

```bash
http://localhost:5173
```

Authorized Redirect URIs:

```bash
http://localhost:5173
```

---

## Step 4: Copy Client ID

Paste into:

Backend `.env`

```env
GOOGLE_CLIENT_ID=
```

Frontend `.env`

```env
VITE_GOOGLE_CLIENT_ID=
```

---

# 🌐 Deployment

## Frontend

Hosted on Vercel

## Backend

Hosted on Render

## Database

MongoDB Atlas

---

# 🚀 Production Environment Variables

## Frontend `.env`

```env
VITE_BASE_API_END_POINT=https://your-render-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

# 🧠 Tech Architecture

```text
Frontend (Vercel)
       ↓
Backend API (Render)
       ↓
MongoDB Atlas
```

---

