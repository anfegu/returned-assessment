import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { logger } from "../utils/logger";
import { Notification } from "../interfaces/notification";

export const getNotifications = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const mockNotifications: Notification[] = [
      { type: "email", message: "Welcome Andrew Guti!", address: "andresguti@example.com", subject: "Hola Mundo" },
      { type: "sms", message: "Your OTP is 1234", countryCode: "+57", phoneNumber: "30467665652" },
    ];
    logger.info("Fetching notifications:", mockNotifications);

    return {
      statusCode: 200,
      body: JSON.stringify(mockNotifications),
    };
  } catch (error) {
    logger.error("Error fetching notifications:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
