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
    ├── docker-compose.yml     # Manages services (Redis)
│   ├── backend/
│   └── movies/
│
├── frontend/              # Angular app with Docker
│   ├── Dockerfile
│   ├── angular.json
│   └── src/
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
git clone https://github.com/brix101/movie-management-platform
cd movie-management-platform
```

### 2. Start All Services with Docker Compose

```bash
cd backend
docker-compose up -d --build
```

### 3. Run Celery Worker (if running outside Docker)

```bash
cd backend
celery -A backend worker --loglevel=info
```

## 🧪 Setting up and Running apps

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
docker build -t angular-app .
docker run -d -p 4200:4200 angular-app

# or

pnpm install
pnpm ng serve
```

## This will start the following services:

- Django backend at `http://localhost:8000`
- Angular frontend at `http://localhost:4200`

