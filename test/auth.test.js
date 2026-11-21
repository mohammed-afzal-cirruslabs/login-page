const { test } = require('node:test');
const assert = require('node:assert');

const BASE_URL = process.env.PORT ? `http://127.0.0.1:${process.env.PORT}` : 'http://127.0.0.1:3000';

async function makeRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  const data = await response.json();
  return { response, data };
}

test('POST /api/auth/login - successful login with valid credentials', async () => {
  const { response, data } = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'password123'
    })
  });

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.message, 'Login successful');
  assert.ok(data.data.user);
  assert.strictEqual(data.data.user.email, 'user@example.com');
  assert.ok(data.data.user.id);
  assert.ok(data.data.token);
});

test('POST /api/auth/login - missing email field', async () => {
  const { response, data } = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      password: 'password123'
    })
  });

  assert.strictEqual(response.status, 400);
  assert.strictEqual(data.success, false);
  assert.strictEqual(data.error, 'Missing required fields');
});

test('POST /api/auth/login - missing password field', async () => {
  const { response, data } = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'user@example.com'
    })
  });

  assert.strictEqual(response.status, 400);
  assert.strictEqual(data.success, false);
  assert.strictEqual(data.error, 'Missing required fields');
});

test('POST /api/auth/login - invalid email format', async () => {
  const { response, data } = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'invalid-email',
      password: 'password123'
    })
  });

  assert.strictEqual(response.status, 400);
  assert.strictEqual(data.success, false);
  assert.strictEqual(data.error, 'Invalid email format');
});

test('POST /api/auth/login - password too short', async () => {
  const { response, data } = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'user@example.com',
      password: '12345'
    })
  });

  assert.strictEqual(response.status, 400);
  assert.strictEqual(data.success, false);
  assert.strictEqual(data.error, 'Invalid password');
});

test('GET /health - health check endpoint', async () => {
  const { response, data } = await makeRequest('/health');

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.status, 'ok');
});
