# Movie Management Platform: Django + Angular

This project consists of:

- **Backend**: Django with Celery and Redis for asynchronous task processing.
- **Frontend**: Angular app containerized with Docker.

## 📁 Project Structure

```
project-root/
│
├── backend/               # Django project with Celery and Redis
│   ├── manage.py
│   ├── requirements.txt
│   ├── your_project/
│   └── your_apps/
│
├── frontend/              # Angular app with Docker
│   ├── Dockerfile
│   ├── angular.json
│   └── src/
│
├── docker-compose.yml     # Manages services (Django, Redis, Celery, Angular)
```

## ⚙️ Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (if running Angular locally without Docker)
- [Python 3.10+](https://www.python.org/) and `venv` (if running Django locally without Docker)
- Redis (already included in Docker setup)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Start All Services with Docker Compose

```bash
docker-compose up --build
```

This will start the following services:

- Django backend at `http://localhost:8000`
- Angular frontend at `http://localhost:4200`
- Redis for Celery message brokering
- Celery worker running alongside Django

### 3. Run Celery Worker (if running outside Docker)

```bash
cd backend
celery -A backend worker --loglevel=info
```

> Replace `backend` with your Django project name if it's different.

## 🧪 Running Locally without Docker

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

## 📦 Required Python Packages (`backend/requirements.txt`)

Make sure these are included:

```
Django>=4.0
celery
redis
django-cors-headers
```

Let me know if you'd like me to generate a sample `docker-compose.yml` as well!

