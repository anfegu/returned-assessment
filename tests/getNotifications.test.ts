import { getNotifications } from '../source/handlers/getNotifications';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('getNotifications', () => {
  it('should return 200 with mock notifications', async () => {
    const mockEvent: Partial<APIGatewayProxyEvent> = {};

    const result = await getNotifications(mockEvent as APIGatewayProxyEvent);
    expect(result.statusCode).toBe(200);
    const notifications = JSON.parse(result.body);
    expect(notifications.length).toBe(2);
    expect(notifications[0].type).toBe('email');
  });
});
