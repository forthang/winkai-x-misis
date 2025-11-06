## Multi‑stage Dockerfile to build the frontend and run the backend

# Stage 1: Build the React frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
# Copy only the package manifests first for better layer caching
COPY frontend/package.json ./
COPY frontend/package-lock.json ./ 
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Python backend and include the built frontend
FROM python:3.11-slim
WORKDIR /app
# Install backend dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
# Copy backend code
COPY backend/app ./app
# Copy built frontend assets
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
# Create directories for uploads and results at runtime
RUN mkdir -p uploads results
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]