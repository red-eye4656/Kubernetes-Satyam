# Kubernetes Full-Stack Application

A full-stack web application deployed on Kubernetes using Minikube.

## Project Overview

This project contains a Node.js/Express frontend and a Python/Flask backend deployed as separate Kubernetes workloads.

The frontend communicates with the Flask backend through a Kubernetes ClusterIP Service.

## Technologies Used

- Node.js
- Express.js
- EJS
- Python
- Flask
- Docker
- Kubernetes
- Minikube
- kubectl
- Kubernetes Services
- ConfigMap
- NetworkPolicy
- Horizontal Pod Autoscaler (HPA)

## Project Structure

```text
Kubernetes_Satyam/
├── frontend/
│   ├── views/
│   │   └── index.ejs
│   ├── public/
│   │   └── style.css
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
│
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── network-policy.yaml
│   ├── hpa.yaml
│   └── rbac.yaml
│
├── Kubernetes_Satyam.docx
├── README.md
└── .gitignore
Kubernetes Namespace

All application resources are deployed in the following namespace:

satyam-app

Create the namespace:

kubectl apply -f k8s/namespace.yaml
Docker Images

The application uses two Docker images:

Backend
docker-satyam-backend:latest
Frontend
docker-satyam-frontend:v2

For Minikube, the images are loaded directly into the Minikube environment:

minikube image load docker-satyam-backend:latest
minikube image load docker-satyam-frontend:v2
Kubernetes Resources

The following Kubernetes resources are configured:

Namespace
Deployments
Services
ConfigMap
NetworkPolicy
Horizontal Pod Autoscaler
RBAC
Backend Deployment

The Flask backend runs on port 5000.

Deployment:

flask-backend

Backend Service:

flask-backend-service

Service type:

ClusterIP

The backend is accessible internally through:

http://flask-backend-service:5000
Frontend Deployment

The Node.js frontend runs on port 3000.

Deployment:

node-frontend

Frontend Service:

node-frontend-service

Service type:

NodePort

The frontend is exposed through NodePort 30759.

Get the frontend URL using:

minikube service node-frontend-service -n satyam-app --url
ConfigMap

The application configuration is stored in the Kubernetes ConfigMap:

app-config

Configuration includes:

APP_ENV=production
BACKEND_URL=http://flask-backend-service:5000
PORT=5000

The frontend receives the backend URL through the ConfigMap.

Health Checks

Both deployments use Kubernetes liveness and readiness probes.

Backend
GET /health
Port: 5000
Frontend
GET /health
Port: 3000

These probes allow Kubernetes to monitor application health and restart unhealthy containers when required.

Resource Requests and Limits

Both frontend and backend containers have CPU and memory resource configurations.

Requests
CPU: 100m
Memory: 128Mi
Limits
CPU: 250m
Memory: 256Mi
Network Policy

A Kubernetes NetworkPolicy named:

backend-access

restricts backend ingress traffic so that the Flask backend accepts traffic from the frontend application.

Backend port:

5000/TCP
Horizontal Pod Autoscaler

The frontend has an HPA:

node-frontend-hpa

Configuration:

Minimum replicas: 1
Maximum replicas: 3
CPU target: 70%

Check HPA status:

kubectl get hpa -n satyam-app
Deploying the Application

Apply the Kubernetes resources:

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/network-policy.yaml
kubectl apply -f k8s/hpa.yaml
Verify Deployment

Check pods:

kubectl get pods -n satyam-app

Expected state:

flask-backend-xxxxx    1/1   Running
node-frontend-xxxxx    1/1   Running

Check deployments:

kubectl get deployments -n satyam-app

Check services:

kubectl get svc -n satyam-app

Check all resources:

kubectl get all -n satyam-app
Application Access

Get the frontend URL:

minikube service node-frontend-service -n satyam-app --url

Example:

http://192.168.49.2:30759

Open the generated URL in a browser to access the application.

Backend API

Health check:

GET /health

Form submission:

POST /submit

The frontend forwards form submissions to the Flask backend using the Kubernetes service:

http://flask-backend-service:5000
Final Kubernetes Status

The deployed application consists of:

Component	Type	Port
Flask Backend	Deployment	5000
Backend Service	ClusterIP	5000
Node Frontend	Deployment	3000
Frontend Service	NodePort	30759
Frontend HPA	HPA	1-3 replicas
Backend Network Policy	NetworkPolicy	5000
Application Configuration	ConfigMap	-
GitHub Repository
https://github.com/red-eye4656/Kubernetes-Satyam
Documentation

Detailed Kubernetes deployment steps, commands, screenshots, and verification results are included in:

Kubernetes_Satyam.docx
Author

Satyam Kumar Singh



