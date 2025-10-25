# User Authentication App

A simple Node.js & Express app for user signup and login with MongoDB. Passwords are securely hashed using bcrypt. Built with EJS templates for views.

## Features
- User signup with email and username
- Login authentication
- Password hashing with bcrypt
- View existing users (for testing/demo)

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- EJS
- bcrypt

## Setup
1. Clone the repository:
```bash
git clone https://github.com/Riyajindal525/userAuth-app.git

2. Install dependencies:

npm install


3. Create a .env file (optional for DB URL, PORT, etc.)

MONGO_URL=mongodb://127.0.0.1:27017/UserInfo2
PORT=8080


4. Run the app:

node app.js


5. Open your browser at http://localhost:8080
