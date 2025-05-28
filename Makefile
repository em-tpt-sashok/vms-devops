build:
	docker-compose up -d --build
up:
	docker-compose up -d
down:
	docker-compose down -v
restart:
	docker-compose down -v && docker-compose up -d
logs:
	docker-compose logs -f
status:
	docker-compose ps
clean:
	docker system prune -f && docker volume prune -f

