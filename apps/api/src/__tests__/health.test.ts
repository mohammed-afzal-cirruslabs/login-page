import { describe, it, expect } from 'vitest'

// Smoke test — verifies the test runner works and the module resolves.
// Real integration tests (with a DB) live in /tests/integration and run
// against a Postgres service container in CI.

describe('API bootstrap', () => {
  it('NODE_ENV is defined', () => {
    // In CI this is set by the workflow; locally it defaults to 'test' via vitest.
    expect(typeof process.env['NODE_ENV']).toBe('string')
  })

  it('basic arithmetic works (sanity)', () => {
    expect(1 + 1).toBe(2)
  })
})
