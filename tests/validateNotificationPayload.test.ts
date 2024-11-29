import { validateNotificationPayload } from '../source/utils/validatePayload';

describe('validateNotificationPayload', () => {
  it('should return null for a valid email payload', () => {
    const validEmailPayload = {
      type: 'email',
      message: 'Test email message',
      address: 'test@example.com',
      subject: 'Test Subject',
    };
    const validationError = validateNotificationPayload(validEmailPayload);

    expect(validationError).toBeNull();
  });

  it('should return null for a valid SMS payload', () => {
    const validSmsPayload = {
      type: 'sms',
      message: 'Test SMS message',
      countryCode: '+1',
      phoneNumber: '1234567890',
    };
    const validationError = validateNotificationPayload(validSmsPayload);

    expect(validationError).toBeNull();
  });

  it('should return an error for a missing type', () => {
    const invalidPayload = { message: 'Test message' };
    const validationError = validateNotificationPayload(invalidPayload);

    expect(validationError).toBe("Invalid or missing 'type' field.");
  });

  it('should return an error for an invalid type', () => {
    const invalidPayload = { type: 'push', message: 'Test message' };
    const validationError = validateNotificationPayload(invalidPayload);

    expect(validationError).toBe("Invalid or missing 'type' field.");
  });

  it('should return an error for a missing message', () => {
    const invalidPayload = { type: 'email', address: 'test@example.com', subject: 'Test Subject' };
    const validationError = validateNotificationPayload(invalidPayload);

    expect(validationError).toBe("Invalid or missing 'message' field.");
  });

  it('should return an error for missing email-specific fields', () => {
    const invalidEmailPayload = { type: 'email', message: 'Test email message' };
    const validationError = validateNotificationPayload(invalidEmailPayload);

    expect(validationError).toBe("Missing fields for email notification: 'address' or 'subject'.");
  });

  it('should return an error for missing SMS-specific fields', () => {
    const invalidSmsPayload = { type: 'sms', message: 'Test SMS message' };
    const validationError = validateNotificationPayload(invalidSmsPayload);

    expect(validationError).toBe("Missing fields for SMS notification: 'countryCode' or 'phoneNumber'.");
  });
});
