# Base Python image
FROM python:3.11-slim

WORKDIR /app
COPY . .

# Install Poetry
RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install

# Run the app
CMD ["python", "-m", "uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000"]