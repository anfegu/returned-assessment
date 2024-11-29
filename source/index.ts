import { APIGatewayProxyHandler } from "aws-lambda";
import { processNotification } from "./handlers/processNotification";
import { getNotifications } from "./handlers/getNotifications";

export const postNotificationHandler: APIGatewayProxyHandler = async (event) => {
  return processNotification(event);
};

export const getNotificationsHandler: APIGatewayProxyHandler = async (event) => {
  return getNotifications(event);
};
