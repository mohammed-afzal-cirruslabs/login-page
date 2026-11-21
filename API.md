# API Documentation

## Authentication Endpoint

### POST /api/auth/login

Authenticates a user with email and password.

#### Request

**Headers:**
- `Content-Type: application/json`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, must be a valid email format
- `password`: Required, minimum 6 characters

#### Response

**Success (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "email": "user@example.com",
      "id": "mock-user-id-1234567890"
    },
    "token": "mock-jwt-token-dXNlckBleGFtcGxlLmNvbQ=="
  }
}
```

**Error Responses:**

**400 Bad Request - Missing Fields:**
```json
{
  "success": false,
  "error": "Missing required fields",
  "message": "Both email and password are required"
}
```

**400 Bad Request - Invalid Email:**
```json
{
  "success": false,
  "error": "Invalid email format",
  "message": "Please provide a valid email address"
}
```

**400 Bad Request - Invalid Password:**
```json
{
  "success": false,
  "error": "Invalid password",
  "message": "Password must be at least 6 characters long"
}
```

## Health Check Endpoint

### GET /health

Returns the server health status.

#### Response

**Success (200 OK):**
```json
{
  "status": "ok"
}
```
