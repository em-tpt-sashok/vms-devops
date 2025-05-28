FROM python:3.11-slim

# 1. Install system dependencies + Poetry
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    pip install poetry && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 4. Copy application code
COPY . .

# 3. Install project dependencies SYSTEM-WIDE
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

# 5. Run using Python module syntax (most reliable)
CMD ["python", "-m", "uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000"]