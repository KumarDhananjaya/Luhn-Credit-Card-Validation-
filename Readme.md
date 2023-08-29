# Credit Card Validation System

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application for credit card validation.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)

## Getting Started

Follow these steps to set up and run the Credit Card Validation System locally on your machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [Download and install Node.js](https://nodejs.org/).
- MongoDB: [Download and install MongoDB](https://www.mongodb.com/try/download/community).

### Installation

1. Download and Extract the zip file and you should see Luhn (Client, Server, Readme)
2. Open this via Visual Studio Code
3. Navigate to the frontend (React) directory:
    ``` 
     cd client 
     cd luhn-validation 
    ```
4. Install client dependencies: 

    ``` npm install ```

5.  Start the client:

    ``` npm start ```

6. Navigate to the backend (node / Express) directory in a new terminal:
   ``` 
   # client
   cd .. 

   # LUHN
   cd ..

   # Server folder
   cd server
   ```
7. Install server dependencies

    ```  npm install ``` 

8. Start the Server

    ``` nodemon index.js ```

9. go to the link http://localhost:3000/ to use the project output
10. Check wheather server is running or not at http://localhost:3001/ if needed
11. You can now use the Credit Card Validation System locally.


## Features
- User Authentication (Signup and Login)
- Credit Card Validation using Luhn Algorithm 
- Card Details Storage in MongoDB

## Technologies Used
1. React Js 
2. Redux - State management
3. Node Js 
4. Express Js
5. MongoDB and Mongoose for NoSQL Database storage
6. JWT for Authentication


