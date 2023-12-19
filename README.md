# Yoga Classes Admission Form - Backend

This repository contains the backend code for the Yoga Classes Admission Form application.

To get to the frontend repo, [click here]()

## Overview

The Yoga Classes Admission Form backend is built using Express.js, Sequelize ORM, and PostgreSQL. It provides endpoints for user enrollment, handles database interactions, and integrates with the frontend.

## Features

- RESTful API for user enrollment.
- PostgreSQL database for storing user and transaction data.
- Sequelize ORM for database interaction.
- Dockerized deployment for easy scalability.

## Getting Started

Follow these steps to run the backend locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/yoga-classes-backend.git
   
   ```

2. **Navigate to the Project Directory:**

   ```bash
    cd yoga-classes-backend
    ```

3. **Install the Dependencies:**

   ```bash
    npm install
   ```

4. **Setup Database**
- Create a PostgreSQL database named `yoga_classes`
- Create a `.env` file in the root directory of the project and add the following environment variables:
    ```
    DB_USERNAME=your-db-username
    DB_PASSWORD=your-db-password
    DB_HOST=your-db-host
    DB_PORT=your-db-port
    DB_NAME=your-db-name
    ```

5. **Run Migrations**
    
        ```bash
        npx sequelize-cli db:migrate
        ```

6. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   The backend should now be running on [localhost:5000](http://localhost:5000).

## Dockerized Deployment

**Prerequisites:**
- Docker installed on your machine

**Build and Run the Docker Image:**

1. Build
```bash
docker build -t yoga-classes-backend .
```

2. Run
```bash
docker run -p 5000:5000 yoga-classes-backend
```

## API Documentation

- **Endpoint:** `/api/enroll`
    - **Method:** `POST`
    - **Description:** Enrolls a user in a class slot.
    - **Request Body:**
        ```json
        {
            "name": String,
            "email": String,
            "age": Integer,
        }
        ```

## Dependencies

-   [Express.js](https://expressjs.com/)
-   [Sequelize ORM](https://sequelize.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Docker](https://www.docker.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.