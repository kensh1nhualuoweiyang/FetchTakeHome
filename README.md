# Background and Execution Description

## Tools and Versions
This application was developed using Node.js version 21.6. Before attempting to execute the application, please ensure that Node.js 21.6 is installed on your device. The application is configured to run on port 3000, so it will be listening on port 3000 for any incoming requests.

## Docker Execution Steps
To run the application using Docker, follow these steps:

1. **Navigate to the current directory** via the terminal.
2. **Build the Docker image** using the following command:
    ```bash
    docker build -t fetchtakehome .
3. **Run the Docker container** using the following command:
    ```bash
    docker run -p 3000:3000 fetchtakehome
4. The application should now be up and running, listening for incoming requests on port 3000.