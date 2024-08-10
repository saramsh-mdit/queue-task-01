# Email Processor

This application processes bulk emails using a queue mechanism and maintains logs in a database to confirm the success of each email. The application also provides a user interface for managing email templates and processing email lists.

## Setup Instructions

1. Clone Repository

```
git clone https://github.com/saramsh-mdit/queue-task-01
cd your-repository
```

2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```
npm install
```

3. Database Migrations

Run the migrations to set up the database schema:

```
// To Generate
npm run migration:generate
// To Run
npm run migrate:run
```

4. Build the Docker Image

Build the Docker image for the application:

```
docker-compose build
```

5. Start the Application

Start the application using Docker Compose:

```
docker-compose up
```

Note: postgres database is used as an instance so you need to install docker first and run the `docker-compose up` to run the database then use the script `npm run dev` / `npm run buld && npm run start` to run the server.

## Project Structure

```
build
dist
frontend - contains frontend code
public - stores user uploaded excel(xlsx) files
src
|---config - configuration file
|---entities - all entities/model files
|---middleware -  middleware files
|---migrations - migration files
|---modules // api and services rated to|---specific field
    |---auth - authentication related files
    |---email - email related files
|---queue - all background worker files
|---utils - utility related functions
    index.ts - program start point
    router.ts - route manage file
    seed-script.ts - file to seed database
.dockerfile - docker file for server
docker-compose.yml - docker compose to handle multiple services
```

## Env File Format

```
PORT=3000
SALT=your_salt_value

POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password
MAILTRAP_EMAIL=your_mailtrap_email
```

Usage
User Authentication

    Register: Users must register with an email and password. A verification link will be sent to the provided email address.
    Login: Users can log in with their credentials after verifying their email.

Bulk Email Processing

    Select Template: Choose an email template from the available options.
    Upload Email List: Upload an Excel file containing the list of email addresses.
    Submit: Submit the email list for bulk processing. The task will be processed in the background using a queue.

Viewing Logs

    Access the logs page to view the status and details of sent emails.
