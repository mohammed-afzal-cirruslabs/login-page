import { describe, it, expect } from 'vitest'

import { cn } from '../lib/cn'

// Unit tests for the cn() class-merging utility.
describe('cn()', () => {
  it('returns an empty string when called with no args', () => {
    expect(cn()).toBe('')
  })

  it('joins class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('ignores falsy values', () => {
    expect(cn('foo', false, undefined, null, 'bar')).toBe('foo bar')
  })

  it('deduplicates conflicting Tailwind classes (last wins)', () => {
    // clsx + tailwind-merge: p-2 is overridden by p-4
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
