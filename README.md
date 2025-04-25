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

#### **Design Decisions**

1.  **Use of Prisma ORM:**

    - The decision to use Prisma was made to efficiently manage the database schema alongside PostgreSQL integration promoting clean and maintainable code.

2.  **Separation of Concerns:**

    - Separated the data access layer from the business logic. This means Prisma types and structures are not used directly in the service layer, enabling easier migration to a different DAO in the future.

3.  **Docker Configuration:**

    - Configured Docker and Docker Compose for easy deployment in production environments, such as on an AWS EC2 instance.

4.  **Environment Configuration:**

    - Utilized a `.env` file for managing production database access seamlessly.

5.  **UUID for ID Management:**

    - Enhanced the data structure with a UUID for easier data management.

6.  **Unique Name Enforcement:**

    - Assigned unique constraints on the name field to prevent the duplication of characters.

7.  **Soft Deletion with `deleted_at`:**

    - Integrated a `deleted_at` column to implement soft deletion of records. This allows records to be flagged as deleted without being permanently removed from the database.

8.  **Enum for Episode Consistency:**

    - Defined an episode enumeration directly in the Prisma schema to uphold database integrity and simplify future expansions.

#### **Ensuring Continued Performance in Production**

To ensure the smooth operation of this application in a production environment, consider implementing the following measures:

- **Logging and Monitoring:**

  - Integrate logging to capture application behavior and errors. Tool like AWS CloudWatch can be beneficial.
  - Implement monitoring tools to track application health and performance metrics.

- **Alerts:**

  - Configure alert systems to notify the team of critical issues like service interruptions or significant performance degradation.

- **Continuous Integration/Continuous Deployment (CI/CD):**

  - Set up automated pipelines for integration and deployment to quickly test and deploy changes. Tools like GitHub Actions, CircleCI or AWS CodePipeline can be utilized.

## Conclusion

For any questions or further details, feel free to check the code or open an issue.
