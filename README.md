# 📄 Social Media Chat Web App – API Documentation

## 🧰 Stack

This project is a backend implementation of a simple social media web application,  
built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).  
It includes core functionalities found in typical social platforms: user authentication, posting content,  
liking posts, commenting on them, and managing personal profiles.

- **Frontend**: React (not included in this documentation)  
- **Backend**: Node.js with Express.js  
- **Database**: MongoDB (via Mongoose ODM)  
- **Authentication**: JWT tokens used via middleware  
- **API Style**: RESTful  

---

## 📦 Data Models

### 🧑‍💻 User Model

The `User` schema defines the structure for storing user-related information.  
All passwords are securely hashed using **bcrypt**.

**Attributes**:
- `userName`: *(String, required, unique)* – The display name of the user.  
- `email`: *(String, required, unique)* – Used for login and identification.  
- `password`: *(String, required)* – Stored as a bcrypt hash.  

---

### 📝 Post Model

The `Post` schema represents content shared by users.  
Each post has an optional image, a description, and tracks which users liked it or commented on it.

**Attributes**:
- `postTitle`: *(String, required, unique)* – The heading or title of the post.  
- `postDescription`: *(String, required, unique)* – The main body or content of the post.  
- `postImage`: *(String)* – Optional field for storing image URL or filename.  
- `postTime`: *(Date, default: Date.now)* – Timestamp of when the post was created.  
- `userId`: *(ObjectId, ref: User)* – The creator of the post.  
- `likes`: *[ObjectId]* – List of user IDs who liked the post.  
- `comments`: *Array* of comment objects (with `commenterId`, `commentMessage`, `commentTime`).  

---

## 🔐 Authentication Middleware

Protected routes require users to include a valid JWT token in their headers.  
The middleware verifies the token, extracts the user data, and attaches it to the request object.  
Unauthorized or expired tokens are rejected with appropriate error responses.

---

## 📁 API Routes Overview

### 🔑 User Routes `/api/user`

Handles user authentication and profile actions.

| Method | Endpoint                  | Protected | Description                                  |
|--------|---------------------------|-----------|----------------------------------------------|
| POST   | `/register`               | ❌        | Registers a new user. Password is hashed.     |
| POST   | `/login`                  | ❌        | Authenticates user and returns JWT token.     |
| GET    | `/allPost`                | ✅        | Retrieves all posts across users.             |
| GET    | `/onePost/:postid`        | ✅        | Fetches a specific post.                      |
| GET    | `/myPost/:user_id`        | ✅        | Fetches all posts created by a user.          |
| POST   | `/changeProfile`          | ✅        | Updates the user's profile details.           |

---

### 📝 Post Routes `/api/post`

Manages post creation, editing, deletion, likes, and comments.

| Method | Endpoint                          | Protected | Description                                |
|--------|-----------------------------------|-----------|--------------------------------------------|
| POST   | `/add`                            | ✅        | Creates a new post.                         |
| POST   | `/edit`                           | ✅        | Updates an existing post.                   |
| GET    | `/delete/:post_id/:user_id`       | ✅        | Deletes a user's own post.                  |
| GET    | `/like/:post_id/:user_id`         | ✅        | Toggles like/unlike on a post.              |
| POST   | `/comment`                        | ✅        | Adds a comment to a post.                   |

---

### 💬 Activity Routes `/api/comment`

Alternate endpoints for liking and commenting on posts.  
These may be unified with `/post` routes in future updates.

| Method | Endpoint              | Protected | Description            |
|--------|-----------------------|-----------|------------------------|
| GET    | `/like/:post_id`      | ✅        | Alternate like endpoint |
| POST   | `/comment`            | ✅        | Alternate comment endpoint |

---


