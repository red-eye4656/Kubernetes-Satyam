# Docker Full-Stack Application

A full-stack web application built using Node.js, Express.js, Flask, Docker, and Docker Compose.

## Project Overview

This project contains two services:

- **Frontend:** Node.js with Express.js
- **Backend:** Python with Flask

The Express frontend provides a form for entering a name, email, and message. The submitted data is sent to the Flask backend through the Docker Compose network.

## Technologies Used

- Node.js
- Express.js
- EJS
- Python
- Flask
- Docker
- Docker Compose
- Docker Hub
- GitHub

## Project Structure

```text
Docker_Satyam/
├── frontend/
│   ├── views/
│   │   └── index.ejs
│   ├── public/
│   │   └── style.css
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
├── .gitignore
├── README.md
└── Docker_Assignment_Documentation.docx
Running the Application

Clone the repository:

git clone https://github.com/red-eye4656/Docker-Satyam.git
cd Docker-Satyam

Build the Docker images:

docker compose build

Start the application:
docker compose up

Open the frontend in a browser:

http://localhost:3000

The Flask backend runs on:

http://localhost:5000
Docker Services
Service	Technology	Port
Frontend	Node.js + Express	3000
Backend	Flask	5000

The frontend communicates with the backend using the Docker Compose service name:

http://backend:5000
Backend API

Health check:

curl http://localhost:5000/health

Form submission endpoint:

POST /submit
Docker Hub Images

Frontend:

redeye4656/docker-satyam-frontend:latest

Backend:
redeye4656/docker-satyam-backend:latest

GitHub Repository

https://github.com/red-eye4656/Docker-Satyam

Author

Satyam Kumar Singh
