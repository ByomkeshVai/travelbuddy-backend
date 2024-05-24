## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (Make sure it's running)
- PGAdmin4 - For GUI (optional)
- Port - 8000

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd your-folder
npm install
```

### Live Link
```
https://travelbuddys-two.vercel.app/
```

## Configuration

- PORT=8000
- DATABASE_URL
- BCRYPT_SALT_ROUNDS
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- JWT_ACCESS_EXPIRES_IN
- JWT_REFRESH_EXPIRES_IN

## Getting Started

- The Main API Link is:http://localhost:8000/api
- You Can find .env variables on .env.example
- migrate Database - npx prisma migrate dev --name added_task
- start the project - npm run start:dev

## Running the Application

### Development Mode

```npm run start:dev
The server will be running at http://localhost:8000
```

### Production Mode

```npm run build
npm start:prod
```

## Linting and Formatting

```
Lint the code: npm run lint
```

```
fix litting issues: npm run lint:fix
```

## Format your code:

```
npm run prettier
```

## Testing

```
npm run test
```

## JWT Payload Contains

```json
{
  "id": "string",
  "email": "string",
  "iat": "string",
  "exp": "string"
}
```

## **Endpoints:**

**`POST /api/register:` The request method like GET, PUT, PATCH, DELETE, POST should not be included in the route path. Follow the pattern as shown in the example for every endpoint: `"/api/register"`**

### **1. User Registration**

- **Endpoint:** **`POST /api/register`**
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "profile": {
    "bio": "Passionate about helping people find their lost items.",
    "age": 30
  }
}
```

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "id": "b9964127-2924-42bb-9970-60f93c016bvf",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-24T12:00:00Z",
    "updatedAt": "2024-03-24T12:00:00Z"
  }
}
```

### **2. User Login**

- **Endpoint:** **`POST /api/login`**
- **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "id": "b9964127-2924-42bb-9970-60f93c016bvf",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "<JWT token>"
  }
}
```

### **3. Create a Trip**

- **Endpoint:** **`POST /api/trips`**
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "destination": "Paris, France",
  "startDate": "2024-06-01",
  "endDate": "2024-06-07",
  "budget": 1500,
  "activities": ["Eiffel Tower visit", "Louvre Museum tour"]
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trip created successfully",
  "data": {
    "id": "b9964127-2924-42bb-9970-60f93c016ghi",
    "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
    "destination": "Paris, France",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "budget": 1500,
    "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
    "createdAt": "2024-03-24T12:00:00Z",
    "updatedAt": "2024-03-24T12:00:00Z"
  }
}
```

### **4. Get Paginated and Filtered Trips**

- **Endpoint:** **`GET /api/trips`**

**Query Parameters for API Requests:**

When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

- `destination`: (Optional) Filter trips by destination.
- `startDate`: (Optional) Filter trips by start date.
- `endDate`: (Optional) Filter trips by end date.
- `budget`: (Optional) Filter trips by budget range. Example: ?minBudget=100&maxBudget=10000
- `searchTerm`: (Optional) Searches for trips based on a keyword or phrase. Only applicable to the following fields: `destination`, `budget`, etc.
- `page`: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2
- `limit`: (Optional) Sets the number of data per page. Default is 10. Example: ?limit=5
- `sortBy`: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: `destination`, `budget`. Example: ?sortBy=budget
- `sortOrder`: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Trips retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 20
  },
  "data": [
    {
      "id": "b9964127-2924-42bb-9970-60f93c016ghi",
      "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
      "destination": "Paris, France",
      "startDate": "2024-06-01",
      "endDate": "2024-06-07",
      "budget": 1500,
      "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
    }
  ]
}
```

### **5. Send Travel Buddy Request**

- **Endpoint:** **`POST /api/trip/:tripId/request`**
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "userId": "b9964127-2924-42bb-9970-60f93c016xyz"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Travel buddy request sent successfully",
  "data": {
    "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
    "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
    "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
    "status": "PENDING",
    "createdAt": "2024-03-24T12:00:00Z",
    "updatedAt": "2024-03-24T12:00:00Z"
  }
}
```

### **6. Get Potential Travel Buddies For a Specific Trip**

- **Endpoint:** **`GET /api/travel-buddies/:tripId`**
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Potential travel buddies retrieved successfully",
  "data": [
    {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
      "userId": "b9964127-2924-42bb-9970-60f93c016xyz",
      "status": "PENDING",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

### **7. Respond to Travel Buddy Request**

- **Endpoint:** **`PUT /api/travel-buddies/:buddyId/respond`**
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
  "status": "APPROVED"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Travel buddy request responded successfully",
  "data": {
    "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
    "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
    "userId": "b9964127-2924-42bb-9970-60f93c016xyz",
    "status": "APPROVED",
    "createdAt": "2024-03-24T12:00:00Z",
    "updatedAt": "2024-03-24T12:05:00Z"
  }
}
```

### **8. Get User Profile**

- **Endpoint:** **`GET /api/profile`**
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-24T12:00:00Z",
    "updatedAt": "2024-03-24T12:00:00Z"
  }
}
```

### **9. Update User Profile**

- **Endpoint:** **`PUT /api/profile`**
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "name": "John Sina",
  "email": "john.doe@example.com"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User profile updated successfully",
  "data": {
    "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
    "name": "John Sina",
    "email": "john.doe@example.com",
    "createdAt": "2024-03-24T12:00:00Z",
    "updatedAt": "2024-03-24T12:05:00Z"
  }
}
```
