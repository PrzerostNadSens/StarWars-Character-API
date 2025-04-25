# StarWars Character API

This project is a web application designed for managing Star Wars character data. The backend is built using **NestJS**, with a **PostgreSQL** database managed through **Prisma ORM**. The frontend is not included in this repository; however, you can interact with the API via Swagger or by running unit tests.

## Technologies Used

- **Backend:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Testing Framework:** Jest

## Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

Before starting, make sure you have the following installed:

- **Docker**
- **Docker Compose**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PrzerostNadSens/StarWars-Character-API.git
   cd StarWars-Character-API
   ```

2. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_URL=postgresql://dev:dev@postgres:5432/test
   ```

3. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This will build the application and run the backend and PostgreSQL database in Docker containers.

### API Documentation

Once the application is running, you can access the Swagger API documentation at:

[http://localhost:3000/docs](http://localhost:3000/docs)

This interactive interface allows you to explore and test the API endpoints.

### Running Unit Tests

To ensure the application works correctly, you can run the unit tests with Jest. To do so, run the following command:

```bash
npm run test
```

This will execute the unit tests and output the results to the terminal.

## Conclusion

For any questions or further details, feel free to check the code or open an issue.
