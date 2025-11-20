# E-Commerce API Documentation

This is a comprehensive e-commerce API built with Node.js, Express, and MongoDB. It provides endpoints for user management, product management, cart operations, and admin functionalities.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [All API Routes](#all-api-routes)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
  - [Cart Routes](#cart-routes)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Sample Responses](#sample-responses)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Start the server: `npm start`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
```

## API Endpoints

### User Routes

Base URL: `/api/users`

#### Register User
- **POST** `/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    }
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User
- **POST** `/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

#### Get User Profile
- **GET** `/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    },
    "role": "user",
    "isVerified": false,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### Update User Profile
- **PUT** `/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "John Smith",
    "phone": "0987654321",
    "address": {
      "street": "456 Oak St",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90210",
      "country": "USA"
    }
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "user": {
      "_id": "user_id",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "0987654321",
      "address": {
        "street": "456 Oak St",
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90210",
        "country": "USA"
      },
      "role": "user",
      "isVerified": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z"
    }
  }
  ```

#### Change Password
- **PUT** `/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "currentPassword": "password123",
    "newPassword": "newpassword123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password changed successfully"
  }
  ```

### Admin Routes

Base URL: `/api/admin`

#### Register Admin
- **POST** `/register`
- **Body:** Same as user registration
- **Response:** Same as user registration

#### Create Product
- **POST** `/products`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
  ```json
  {
    "name": "Organic Honey",
    "description": "Pure organic honey",
    "price": 15.99,
    "category": "Food",
    "subcategory": "Sweeteners",
    "brand": "Nature's Best",
    "images": ["http://example.com/image.jpg"],
    "stock": 100,
    "weight": 0.5,
    "dimensions": {
      "length": 10,
      "width": 10,
      "height": 15
    },
    "tags": ["organic", "natural"],
    "sku": "ORG-HNY-001",
    "seoTitle": "Organic Honey - Nature's Best",
    "seoDescription": "Pure organic honey from Nature's Best"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product created successfully",
    "product": {
      "_id": "product_id",
      "name": "Organic Honey",
      "description": "Pure organic honey",
      "price": 15.99,
      "category": "Food",
      "subcategory": "Sweeteners",
      "brand": "Nature's Best",
      "images": ["http://example.com/image.jpg"],
      "stock": 100,
      "weight": 0.5,
      "dimensions": {
        "length": 10,
        "width": 10,
        "height": 15
      },
      "tags": ["organic", "natural"],
      "isActive": true,
      "rating": 0,
      "reviewCount": 0,
      "sku": "ORG-HNY-001",
      "seoTitle": "Organic Honey - Nature's Best",
      "seoDescription": "Pure organic honey from Nature's Best",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

#### Get All Products
- **GET** `/products`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Query Parameters:** `page`, `limit`, `search`, `category`, `minPrice`, `maxPrice`, `sortBy`, `sortOrder`
- **Response:**
  ```json
  {
    "products": [
      {
        "_id": "product_id",
        "name": "Organic Honey",
        "description": "Pure organic honey",
        "price": 15.99,
        "category": "Food",
        "subcategory": "Sweeteners",
        "brand": "Nature's Best",
        "images": ["http://example.com/image.jpg"],
        "stock": 100,
        "weight": 0.5,
        "dimensions": {
          "length": 10,
          "width": 10,
          "height": 15
        },
        "tags": ["organic", "natural"],
        "isActive": true,
        "rating": 0,
        "reviewCount": 0,
        "sku": "ORG-HNY-001",
        "seoTitle": "Organic Honey - Nature's Best",
        "seoDescription": "Pure organic honey from Nature's Best",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "totalPages": 1,
    "currentPage": 1,
    "totalProducts": 1
  }
  ```

#### Get Product by ID
- **GET** `/products/:id`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** Single product object

#### Update Product
- **PUT** `/products/:id`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:** Partial product data
- **Response:**
  ```json
  {
    "message": "Product updated successfully",
    "product": { ... }
  }
  ```

#### Delete Product
- **DELETE** `/products/:id`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:**
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

#### Get All Users
- **GET** `/users`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** Array of user objects (without passwords)

#### Update User Role
- **PUT** `/users/:id/role`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
  ```json
  {
    "role": "admin"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User role updated successfully",
    "user": { ... }
  }
  ```

#### Get All Orders
- **GET** `/orders`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** Array of order objects with populated user and product data

#### Update Order Status
- **PUT** `/orders/:id/status`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
  ```json
  {
    "status": "shipped"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Order status updated successfully",
    "order": { ... }
  }
  ```

### Cart Routes

Base URL: `/api/cart`

#### Get Cart
- **GET** `/`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "_id": "cart_id",
    "user": "user_id",
    "items": [
      {
        "product": {
          "_id": "product_id",
          "name": "Organic Honey",
          "price": 15.99,
          "images": ["http://example.com/image.jpg"]
        },
        "quantity": 2,
        "addedAt": "2023-01-01T00:00:00.000Z",
        "_id": "item_id"
      }
    ],
    "totalItems": 2,
    "totalPrice": 31.98,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### Add to Cart
- **POST** `/add`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "productId": "product_id",
    "quantity": 2
  }
  ```
- **Response:**
  ```json
  {
    "message": "Item added to cart successfully",
    "cart": { ... }
  }
  ```

#### Update Cart Item
- **PUT** `/update/:productId`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "quantity": 3
  }
  ```
- **Response:**
  ```json
  {
    "message": "Cart item updated successfully",
    "cart": { ... }
  }
  ```

#### Remove from Cart
- **DELETE** `/remove/:productId`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Item removed from cart successfully",
    "cart": { ... }
  }
  ```

#### Clear Cart
- **DELETE** `/clear`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Cart cleared successfully"
  }
  ```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request:** Validation errors or invalid input
- **401 Unauthorized:** Missing or invalid authentication token
- **403 Forbidden:** Insufficient permissions
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server errors

Error response format:
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Sample Responses

All successful responses follow a consistent format. Error responses include appropriate status codes and descriptive messages.

For more details on specific endpoints, refer to the route files and controller implementations in the codebase.
