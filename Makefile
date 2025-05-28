up:
	docker-compose up -d --build
down:
	docker-compose down
logs:
	docker-compose logs -f
clean:
	docker system prune -f && docker volume prune -f
