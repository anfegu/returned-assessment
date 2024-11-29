import { validateNotificationPayload } from '../source/utils/validatePayload';

describe('validateNotificationPayload', () => {
  it('should return null for a valid payload', () => {
    const validPayload = { type: 'email', message: 'Test message' };
    const validationError = validateNotificationPayload(validPayload);

    expect(validationError).toBeNull();
  });

  it('should return an error message for an invalid payload (missing type)', () => {
    const invalidPayload = { message: 'Test message' }; // type falta
    const validationError = validateNotificationPayload(invalidPayload);

    expect(validationError).toBe("Invalid or missing 'type' field.");
  });

  it('should return an error message for an invalid payload (invalid type)', () => {
    const invalidPayload = { type: 'push', message: 'Test message' }; // type no válido
    const validationError = validateNotificationPayload(invalidPayload);

    expect(validationError).toBe("Invalid or missing 'type' field.");
  });

  it('should return an error message for an invalid payload (missing message)', () => {
    const invalidPayload = { type: 'email' }; // message falta
    const validationError = validateNotificationPayload(invalidPayload);

    expect(validationError).toBe("Invalid or missing 'message' field.");
  });
});
