# Code Arena Projects

This repository contains the template files and hidden test files for all the dynamic code arena projects.

## Project Structure
Each project contains two folders:
- `template/`: The initial starter code the user sees.
- `hidden-tests/`: The test scripts that evaluate the user's code using "smart" logic (verifying DOM outputs, network requests, etc.) without exposing the answers to the user.

---

## 1. 01-doubling-counter
- **Name**: Doubling Counter
- **Type**: React/Vite
- **Description**: A basic counter that doubles the current number.
- **Base Image**: `node:18`
- **Install Command**: `npm install`
- **Entrypoint**: `npm`
- **Arguments**: `run, dev`
- **Test Command**: `npm test`
- **Internal Port**: `3000`

## 2. 02-task-board
- **Name**: Task Board
- **Type**: React/Vite
- **Description**: A Kanban-style task board where users manage "To Do" and "Done" tasks. Tests verify the DOM directly.
- **Base Image**: `node:18`
- **Install Command**: `npm install`
- **Entrypoint**: `npm`
- **Arguments**: `run, dev`
- **Test Command**: `npm test`
- **Internal Port**: `3000`

## 3. 03-inventory-api
- **Name**: Inventory API
- **Type**: Node.js / Express
- **Description**: A REST API for a store's inventory. Users must fix a broken `GET` and `POST` route. Tests use `supertest` to hit the API endpoints.
- **Base Image**: `node:18`
- **Install Command**: `npm install`
- **Entrypoint**: `npm`
- **Arguments**: `run, dev`
- **Test Command**: `npm test`
- **Internal Port**: `3000`

## 4. 04-python-flask-auth
- **Name**: Flask Authentication System
- **Type**: Python / Flask
- **Description**: A Flask server handling user registration. Users must implement password hashing and fix a 401 Unauthorized bug.
- **Base Image**: `python:3.10`
- **Install Command**: `pip install -r requirements.txt`
- **Entrypoint**: `python`
- **Arguments**: `app.py`
- **Test Command**: `pytest`
- **Internal Port**: `5000`

## 5. 05-spring-boot-api
- **Name**: Spring Boot Library API
- **Type**: Java / Spring Boot
- **Description**: A basic REST controller for managing library books. Users must map the endpoints properly.
- **Base Image**: `openjdk:17`
- **Install Command**: `chmod +x mvnw && ./mvnw clean install -DskipTests`
- **Entrypoint**: `./mvnw`
- **Arguments**: `spring-boot:run`
- **Test Command**: `./mvnw test`
- **Internal Port**: `8080`
