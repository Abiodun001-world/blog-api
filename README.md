# Blog-API

This is a RESTful API for a blogging platform built using Node.js, Express.js, and MongoDB. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts, and it supports user authentication and authorization using JWT (JSON Web Token).

## Features

- User Registration and Login: Users can register with a unique username and password. JWT authentication is used for secure login.

- Blog Post Management: Users can create, read, update, and delete blog posts. Each blog post includes a title, content, author information, and a timestamp.

- User Authorization: The API ensures that only authorized users can perform actions like creating, updating, and deleting blog posts. Authorization is based on user roles.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Abiodun001-world/blog-api.git
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` File:**

   Create a file named `.env` in the project root and add the following:

   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```

   Replace `your_jwt_secret_key` and `your_mongodb_connection_string` with your JWT secret key and MongoDB connection string.

4. **Run the Application:**

   ```bash
   npm start
   ```

   The server will be running at http://localhost:3000 or the specified port.

## API Endpoints

- **User Registration:**
  - `POST /auth/register`

- **User Login:**
  - `POST /auth/login`

- **Blog Post Operations:**
  - `GET /blog-posts`: Get all blog posts
  - `POST /blog-posts`: Create a new blog post
  - `PUT /blog-posts/:postId`: Update an existing blog post
  - `DELETE /blog-posts/:postId`: Delete an existing blog post

## Testing

Run the tests:

```bash
npm test
```

## Environment Variables

- `PORT`: The port on which the server will run.
- `JWT_SECRET`: The secret key for JWT token generation and verification.
- `MONGODB_URI`: The connection string for MongoDB.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.