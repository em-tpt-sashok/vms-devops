# 🚧 VMS Local Development Environment

This project provides a fully containerized local development environment for the **VMS system**, including:

- Backend (FastAPI)
- Frontend (React via Vite)
- TimescaleDB (PostgreSQL)
- Kafka & Zookeeper
- MinIO (S3-compatible object storage)

---

## 📦 Prerequisites

Make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/)

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://your.repo.url/vms-project.git
cd vms-project
```
#### 🚀 Running the Stack
Use these make commands:
```
| Command        | Description                                   |
| -------------- | --------------------------------------------- |
| `make build`   | Build and start services (`--build`)          |
| `make up`      | Start services (without rebuilding)           |
| `make down`    | Stop and remove containers & volumes          |
| `make restart` | Recreate the stack from scratch               |
| `make logs`    | Follow logs from all services                 |
| `make status`  | Show running services                         |
| `make clean`   | Prune Docker system & volumes (⚠️ wipes all!) |
```

#### 🌐 Exposed Ports & Services

| Service        | URL / Port                                     | Description                                       |
| -------------- | ---------------------------------------------- | ------------------------------------------------- |
| **Backend**    | [http://localhost:8000](http://localhost:8000) | FastAPI backend microservice                      |
| **Frontend**   | [http://localhost:5173](http://localhost:5173) | Vite-based React frontend                         |
| **MinIO**      | [http://localhost:9000](http://localhost:9000) | MinIO S3-compatible object storage (API endpoint) |
|                | [http://localhost:9001](http://localhost:9001) | MinIO console UI                                  |
| **PostgreSQL** | `localhost:5432`                               | TimescaleDB (PostgreSQL-compatible)               |
| **Kafka**      | `localhost:9092`                               | Kafka broker (plaintext only)                     |
| **Zookeeper**  | `localhost:2181`                               | Zookeeper for Kafka coordination                  |

##### 📂 Volumes & Persistent Storage
```Service	Host Path	Container Path
Backend	./backend	/app
Frontend	./frontend	/app/frontend
PostgreSQL	db_data (Docker)	/var/lib/postgresql/data
Kafka	kafka (Docker)	/bitnami/kafka
MinIO	minio_data (Docker)	/data
```

###### 📈 Logs & Health Checks
Logs
```bash
make logs
```
To follow logs for a specific service:
```bash
docker-compose logs -f <service-name>
```
Health Check (Backend)
```bash
curl http://localhost:8000/healthz
```

###### ✅ Example Dev Workflow
```bash
make build       # Build and start services
make status      # Check if everything is running
make logs        # Tail all logs
make down        # Stop services
make clean       # Cleanup all Docker resources
```

🧹 Clean Up
To completely remove containers, images, and volumes:

```bash
make clean
```
⚠️ This removes all unused Docker resources, not just project-specific ones.
