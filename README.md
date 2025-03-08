# Food Delivery Website - Backend

#### Overview

The backend of the food delivery website is responsible for managing business logic, handling user authentication, processing orders, and communicating with the database. It is built using Node.js and Express.js, with MongoDB as the database.

### Features

- User Authentication: Secure JWT-based authentication.

- Product Management: CRUD operations for food items.

- Order Management: Order placement, tracking, and history.

- Payment Integration: Secure payment processing using Stripe.

- Admin Privileges: Role-based access control for managing orders and products.

- Database Storage: MongoDB for structured data storage.

### Tech Stack

- Backend Framework: Node.js with Express.js

- Database: MongoDB with Mongoose ORM

- Authentication: JSON Web Tokens (JWT)

- Payment Processing: Stripe API

- Environment Management: Dotenv

###  Roadmap

####  Phase 1: API Development

- Set up Express.js server

- Define database schema for users, products, and orders

#### Phase 2: Authentication & Authorization

- Implement JWT authentication

- Role-based access control for users and admins

#### Phase 3: Order Processing

- Implement order placement and order tracking

- Integrate payment system (Stripe)

#### Phase 4: Deployment & Optimization

- Optimize API performance

- Deploy backend using vercel

### NPM Libraries Used

- express: Web framework for Node.js

- mongoose: ODM for MongoDB

- jsonwebtoken: Token-based authentication

- bcryptjs: Password hashing

- dotenv: Environment variable management

- cors: Enable cross-origin requests

- stripe: Payment processing API

###  API Endpoints

#### User Authentication

- Register a User
```
POST /api/auth/register
```
- Login User
```
POST /api/auth/login
```
- Fetch Products
```
 GET /api/products
```
- Place an Order
```
POST /api/orders
```
#### This document provides an overview of the Backend for the food delivery website. 

## Connect With Me

- [PORTFOLIO](ashrafpoless.vercel.app)
- [GITHUB](https://github.com/Ashrafpoless)
- [LINKEDIN](https://www.linkedin.com/in/ashraf-poless-034349317/)