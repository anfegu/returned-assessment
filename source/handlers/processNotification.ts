import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validateNotificationPayload } from '../utils/validatePayload';
import { logger } from '../utils/logger';
import { Notification } from '../interfaces/notification';

export const processNotification = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const notification: Notification = JSON.parse(event.body || '{}');

    // Validación
    const validationError = validateNotificationPayload(notification);
    if (validationError) {
      logger.error('Error processing notification:', validationError);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: validationError }),
      };
    }

    // Procesa la notificación
    logger.info('Processing notification:', notification);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notification processed successfully' }),
    };
  } catch (error) {
    logger.error('Error processing notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
