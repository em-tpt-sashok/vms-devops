readme_content = """
# VMS Local Development Environment — Onboarding Guide

Welcome to the VMS (Video Management System) local development environment! This guide helps you get started running all services locally using Docker Compose, understanding exposed ports, credentials, volumes, and viewing logs and health metrics.

---

## 1. Run Services Locally via Docker Compose

All services are defined in the `docker-compose.yml` file. To start the entire environment, simply run:

```bash
make up
This command will:

Build and start all backend FastAPI microservices (auth, admin, device, ai)

Start React.js frontend

Start Kafka + Zookeeper (event bus)

Start MinIO (video storage)

Start TimescaleDB + PostgreSQL (metadata database)

To stop all running containers:

bash
Always show details

Copy
make down
To remove all containers, networks, and volumes for a fresh start:

bash
Always show details

Copy
make clean
2. Exposed Ports and Default Credentials
Service	URL / Port	Default Credentials
Auth API	http://localhost:8001	N/A (configure via env)
Admin API	http://localhost:8002	N/A
Device API	http://localhost:8003	N/A
AI API	http://localhost:8004	N/A
Frontend	http://localhost:3000	N/A
Kafka	9092	N/A
Zookeeper	2181	N/A
MinIO Console	http://localhost:9001	Access Key: minioadmin
Secret Key: minioadmin
MinIO S3 API	http://localhost:9000	Same as above
TimescaleDB	5432	User: postgres, Pass: postgres

3. Volumes and Persistence
Data for services is persisted using Docker volumes:

PostgreSQL/TimescaleDB: db_data

MinIO: minio_data

Kafka: kafka

Inspect volumes with:

bash
Always show details

Copy
docker volume ls
4. Logs and Health Metrics
To view logs for all running services:

bash
Always show details

Copy
make logs
Or view logs of individual services:

bash
Always show details

Copy
docker logs -f <container_name>
Health endpoints (use your browser or curl):

http://localhost:8001/health — Auth API

http://localhost:8002/health — Admin API

http://localhost:8003/health — Device API

http://localhost:8004/health — AI API

5. Makefile Helper Commands
Command	Description
make up	Build and start all services
make down	Stop all running containers
make logs	Follow logs for all services
make clean	Stop containers and remove all volumes

6. How to Use
Clone this repository.

Copy .env.example to .env and adjust variables as needed.

Run:

bash
Always show details

Copy
make up
Open the frontend: http://localhost:3000

Use backend APIs on their respective ports.

View logs with make logs.

Stop with make down, reset with make clean.

7. Troubleshooting
Ports in use? Change them in .env or stop conflicting services.

Errors? Check logs via make logs.

Reset everything with make clean if needed.

8. Notes
This environment is for local development only.

Kafka and Zookeeper are set up for development (PLAINTEXT).

MinIO uses default keys — change them in .env for security.

All backend services expose /health endpoints.

