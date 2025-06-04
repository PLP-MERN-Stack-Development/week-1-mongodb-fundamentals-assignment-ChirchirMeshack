# MongoDB Bookstore Project

## Overview

This project demonstrates basic CRUD operations, advanced queries, aggregation pipelines, and indexing in MongoDB using a bookstore database.

## Setup

1.  **Install MongoDB:**

    *   Install MongoDB Community Edition from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) or set up a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2.  **Install Node.js:**

    *   Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
3.  **Create Project Directory:**

    *   Create a new directory for the project.
    *   Create the following files: `insert_books.js`, `queries.js`, and `README.md`.
4.  **Install MongoDB Driver:**

    *   Navigate to your project directory in the terminal and run:

        ```bash
        npm install mongodb
        ```

## Usage

### 1. Populate the Database

*   Run the `insert_books.js` script to insert sample data into the `plp_bookstore` database and the `books` collection:

    ```bash
    node insert_books.js
    ```

### 2. Execute Queries

*   Run the `queries.js` script to execute various MongoDB queries:

    ```bash
    node queries.js
    ```

## Scripts

*   `insert_books.js`: Inserts sample book data into the `books` collection.
*   `queries.js`: Contains MongoDB queries for CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Screenshots

*   ![screenshot of Atlas showing the `books` collection and sample data.](./image.png)


## Notes

*   Make sure MongoDB is running locally on the default port (27017) or update the connection URI in the scripts accordingly.
*   The `queries.js` script includes examples of indexing and the `explain()` method to demonstrate performance improvements.
*   Adjust the `pageNumber` variable in `queries.js` to navigate through paginated results.