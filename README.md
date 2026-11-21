# login-page
Clean, accessible login page — HTML/CSS/JS, no build step

## Getting Started

### Installation
```bash
npm install
```

### Running the Server
```bash
npm start
```

The server will start on port 3000 (or the PORT environment variable if set).

### Running Tests
```bash
npm test
```

## API Endpoints

### POST /api/auth/login
Authenticates a user with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "email": "user@example.com",
      "id": "mock-user-id-1234567890"
    },
    "token": "mock-jwt-token-..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Error type",
  "message": "Error description"
}
```

See [API.md](./API.md) for complete API documentation.

### GET /health
Health check endpoint that returns `{"status": "ok"}`
