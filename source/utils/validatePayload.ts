import { NotificationType } from "../interfaces/notification";

export const validateNotificationPayload = (payload: any): string | null => {
  const validTypes: NotificationType[] = ["email", "sms"];
  
  if (!payload.type || !validTypes.includes(payload.type)) {
    return "Invalid or missing 'type' field.";
  }
  if (!payload.message || typeof payload.message !== "string") {
    return "Invalid or missing 'message' field.";
  }
  
  if (payload.type === "email" && (!payload.address || !payload.subject)) {
    return "Missing fields for email notification: 'address' or 'subject'.";
  }
  
  if (payload.type === "sms" && (!payload.countryCode || !payload.phoneNumber)) {
    return "Missing fields for SMS notification: 'countryCode' or 'phoneNumber'.";
  }
  
  return null;
};
