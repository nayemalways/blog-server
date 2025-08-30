# Blog Site Server

A RESTful API server for a blog platform where users can create accounts, post blogs, read, update, and delete them, and comment on other users' posts.

## Features

- **User Authentication**
  - User registration and login
  - Password hashing for security
  - JWT-based authentication for protected routes

- **Blog Management**
  - Create new blog posts
  - Read all or individual blog posts
  - Update or delete your own posts
  - Search or filter posts (optional)

- **Comments**
  - Add comments to any blog post
  - Read all comments on a blog
  - Update or delete your own comments

- **Authorization**
  - Users can only modify or delete their own blogs and comments
  - Public can read blogs without authentication (optional)

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB / Mongoose  
- **Authentication:** JWT (JSON Web Token)  
- **Validation:** Joi / Zod (optional)  

## API Endpoints

### Users
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive a token  
- `GET /api/users/:id` – Get user details  

### Blogs
- `POST /api/blogs` – Create a new blog (authenticated)  
- `GET /api/blogs` – Get all blogs  
- `GET /api/blogs/:id` – Get a specific blog  
- `PUT /api/blogs/:id` – Update a blog (authenticated & owner only)  
- `DELETE /api/blogs/:id` – Delete a blog (authenticated & owner only)  

### Comments
- `POST /api/blogs/:id/comments` – Add a comment to a blog (authenticated)  
- `GET /api/blogs/:id/comments` – Get all comments for a blog  
- `PUT /api/comments/:id` – Update a comment (authenticated & owner only)  
- `DELETE /api/comments/:id` – Delete a comment (authenticated & owner only)  

