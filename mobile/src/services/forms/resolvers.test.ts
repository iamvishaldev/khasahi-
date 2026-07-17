import {describe, it, expect} from '@jest/globals';
import {signInSchema} from './resolvers';

describe('signInSchema', () => {
  it('accepts a valid email and password', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: 'hunter22',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an empty email', () => {
    const result = signInSchema.safeParse({email: '', password: 'hunter22'});

    expect(result.success).toBe(false);
  });

  it('rejects a malformed email', () => {
    const result = signInSchema.safeParse({
      email: 'not-an-email',
      password: 'hunter22',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a password shorter than 6 characters', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: '123',
    });

    expect(result.success).toBe(false);
  });
});
