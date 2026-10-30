import { describe, it, expect } from 'vitest'

// Smoke test — confirms the test runner is wired correctly in the web app.
// Component tests (with @testing-library/react) are added per feature.

describe('Web app bootstrap', () => {
  it('environment is defined', () => {
    expect(typeof process.env.NODE_ENV).toBe('string')
  })

  it('basic arithmetic works (sanity)', () => {
    expect(2 * 2).toBe(4)
  })
})
