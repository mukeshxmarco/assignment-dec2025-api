# Cards Store - Backend API

Hey there! This is the backend for the Cards Store application. It's a Node.js API that handles user authentication, profile management, and card storage. Think of it as the brain behind the whole operation.

## What's Inside?

This backend is built with some solid, battle-tested tools:

- **Express.js** - The web framework that handles all our routes and requests
- **MongoDB** with **Mongoose** - Our database where we store users and their cards
- **JWT (jsonwebtoken)** - Keeps everything secure with token-based authentication
- **bcryptjs** - Hashes passwords so they're safe in the database
- **CORS** - Lets our frontend talk to the backend without issues
- **dotenv** - Manages environment variables cleanly
- **nodemon** - Auto-restarts the server during development (life saver!)

## How It Works

The app follows a pretty standard MVC-ish architecture:

- **Controllers** handle the business logic for auth and user operations
- **Services** do the heavy lifting (creating users, verifying OTPs, managing cards)
- **Models** define how data looks in MongoDB (User and Card schemas)
- **Middlewares** check if users are logged in and verified
- **Routes** connect URLs to the right controllers
- **Utils** have helper functions for bcrypt, JWT, and response formatting

## API Endpoints

Here's what the backend can do:

### Authentication
- `POST /auth/signup` - Create a new account
- `POST /auth/login` - Log in and get a token

### User Management (all need authentication)
- `GET /user/profile` - Get your profile info
- `POST /user/basic` - Update basic info (name, DOB, address)
- `POST /user/verify-otp` - Verify the OTP sent after signup
- `POST /user/card` - Add a new card
- `GET /user/cards` - Get all your saved cards

There's also a `GET /health` endpoint to check if the server's running.

## Getting Started

Alright, let's get this thing running on your machine!

### Prerequisites

You'll need:
- **Node.js** (v16 or higher is good)
- **pnpm** (v10.25.0 or higher) - This project uses pnpm, not npm
- **MongoDB** - Either running locally or a connection string to a cloud instance (like MongoDB Atlas)

### Installation

1. **Clone the repo** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd cards-store/backend
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   
   Copy the example env file:
   ```bash
   cp .env.example .env
   ```
   
   Then open `.env` and fill in your details:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/be_intern_db
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
   
   **Important**: Change the `JWT_SECRET` to something random and secure!

4. **Make sure MongoDB is running**:
   
   If you're using a local MongoDB:
   ```bash
   # On macOS with Homebrew:
   brew services start mongodb-community
   
   # Or just run it directly:
   mongod
   ```
   
   If you're using MongoDB Atlas, just paste your connection string in the `.env` file.

5. **Start the server**:
   
   For development (with auto-reload):
   ```bash
   pnpm dev
   ```
   
   For production:
   ```bash
   pnpm start
   ```

6. **Check if it's working**:
   
   Open your browser or use curl:
   ```bash
   curl http://localhost:5000/health
   ```
   
   You should see a nice JSON response saying everything's okay!

## Project Structure

Here's how things are organized:

```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   ├── config/
│   │   ├── config.js       # Configuration management
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Auth logic
│   │   └── user.controller.js    # User operations
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── verified.middleware.js # OTP verification check
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Card.js         # Card schema
│   ├── routes/
│   │   ├── auth.routes.js  # Auth endpoints
│   │   └── user.routes.js  # User endpoints
│   ├── services/
│   │   ├── auth.service.js # Auth business logic
│   │   └── user.service.js # User business logic
│   └── utils/
│       ├── bcrypt.js       # Password hashing
│       ├── jwt.js          # Token generation/verification
│       └── response.js     # Standardized API responses
├── .env                    # Your environment variables
├── .env.example            # Example environment variables
└── package.json            # Dependencies and scripts
```

## Environment Variables

Here's what each variable does:

- **PORT**: Which port the server runs on (default: 5000)
- **MONGODB_URI**: Your MongoDB connection string
- **JWT_SECRET**: Secret key for signing JWTs (make it strong!)
- **NODE_ENV**: Environment mode (development/production)
- **FRONTEND_URL**: Where your frontend is running (for CORS)

## Development Tips

- The server auto-restarts when you make changes (thanks to nodemon)
- Check the console for any errors or logs
- MongoDB must be running before starting the server
- If you change the PORT, make sure to update it in the frontend's `.env` too

## Common Issues

**Server won't start?**
- Check if MongoDB is running
- Make sure the `.env` file exists and has all required variables
- Verify the port isn't already in use

**CORS errors?**
- Double-check the `FRONTEND_URL` in your `.env`
- Make sure it matches where your frontend is actually running

**Authentication not working?**
- Verify your `JWT_SECRET` is set
- Check if the token is being sent correctly from the frontend

## What's Not Included

This is a learning/assignment project, so some production features aren't here:
- Rate limiting
- Email service for OTP delivery
- Password reset functionality
- Input validation library (like Joi or Yup)
- Comprehensive error logging
- API documentation (like Swagger)
- Unit/integration tests

## Tech Stack Summary

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Dev Tools**: nodemon
- **Package Manager**: pnpm

That's pretty much it! If you run into any issues, check the code comments or feel free to reach out. Happy coding! 🚀
