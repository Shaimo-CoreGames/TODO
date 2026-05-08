markdown_content = """# Task Master: Full-Stack Todo Application

A modern, full-stack Todo application built with a focus on speed, security, and persistence. This project was developed to master the integration between a React frontend and a FastAPI backend.

## 🚀 Tech Stack

### Frontend
* **React (Vite):** Fast and modern UI library.
* **Tailwind CSS:** Utility-first CSS framework for professional styling.
* **Lucide-React:** For beautiful, consistent iconography.
* **Axios:** For handling HTTP requests and backend communication.

### Backend
* **FastAPI:** High-performance Python web framework.
* **SQLAlchemy:** ORM for database management.
* **SQLite:** Persistent file-based database.
* **JWT (JSON Web Tokens):** Secure authentication and authorization.
* **Pydantic:** Data validation and settings management using Python type annotations.

## ✨ Key Features

* **Full CRUD Operations:** Create, Read, Update (Toggle), and Delete tasks.
* **JWT Authentication:** Secure User Signup and Login system.
* **Persistence:** All tasks and user accounts are saved in an SQLite database.
* **Responsive UI:** A clean, mobile-friendly interface styled with Tailwind CSS.
* **Real-time Updates:** React state management ensures the UI updates instantly without page refreshes.

## 📂 Project Structure

```text
todo-app/
├── backend/
│   ├── main.py          # FastAPI routes and app logic
│   ├── models.py        # SQLAlchemy database models
│   ├── database.py      # Database connection setup
│   ├── auth.py          # JWT and Password hashing logic
│   ├── todos.db         # SQLite database file (generated)
│   └── venv/            # Python virtual environment
└── frontend/
    ├── src/
    │   ├── App.jsx      # Main application logic and state
    │   ├── Login.jsx    # Authentication UI
    │   └── index.css    # Tailwind directives
    ├── tailwind.config.js
    └── package.json
```


🛠️ Setup & Installation
1. Backend Setup
Navigate to the backend folder: cd backend

Activate your virtual environment:

Windows: venv\\Scripts\\activate

Mac/Linux: source venv/bin/activate

Install dependencies:

```Bash
pip install fastapi uvicorn sqlalchemy python-multipart python-jose[cryptography] passlib[bcrypt]
```
Start the server:

Bash
```
uvicorn main:app --reload
```
2. Frontend Setup
Navigate to the frontend folder: cd frontend

Install dependencies:

Bash
```
npm install
```
Start the development server:
Bash
```
npm run dev
```
