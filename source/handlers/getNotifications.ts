import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { logger } from "../utils/logger";

export const getNotifications = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const mockNotifications = [
      { id: 1, type: "email", message: "Welcome Andrew!" },
      { id: 2, type: "sms", message: "Your OTP is 1234" },
    ];

    // Log the event and the mock data
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
