import { processNotification } from '../source/handlers/processNotification';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { validateNotificationPayload } from '../source/utils/validatePayload';
import { logger } from '../source/utils/logger';

// Mocking dependencias
jest.mock('../source/utils/validatePayload');
jest.mock('../source/utils/logger');
jest.spyOn(logger, 'info').mockImplementation(jest.fn());
jest.spyOn(logger, 'error').mockImplementation(jest.fn());

describe('processNotification Handler', () => {
  let mockEvent: APIGatewayProxyEvent;

  beforeEach(() => {
    mockEvent = {
      body: JSON.stringify({ type: 'email', message: 'Test message' }),
    } as any;
  });

  it('should return 200 and a success message when notification is valid', async () => {
    (validateNotificationPayload as jest.Mock).mockReturnValue(null);

    const response = await processNotification(mockEvent);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe('Notification processed successfully');
    expect(logger.info).toHaveBeenCalledWith("Processing notification:", expect.anything());
  });

  it('should return 400 and an error message when notification is invalid', async () => {
    const invalidEvent: APIGatewayProxyEvent = {
      body: JSON.stringify({ type: 'invalid' }),  // payload inválido
    } as any;

    (validateNotificationPayload as jest.Mock).mockReturnValue('Invalid or missing \'type\' field.');

    const response = await processNotification(invalidEvent);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).error).toBe('Invalid or missing \'type\' field.');
    expect(logger.error).toHaveBeenCalledWith("Error processing notification:", expect.anything());
  });

  it('should return 500 and an error message if there is an internal server error', async () => {
    const faultyEvent: APIGatewayProxyEvent = {
      body: 'bad json',
    } as any;

    const response = await processNotification(faultyEvent);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).error).toBe('Internal Server Error');
    expect(logger.error).toHaveBeenCalledWith("Error processing notification:", expect.anything());
  });
});
