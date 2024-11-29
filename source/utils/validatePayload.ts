export const validateNotificationPayload = (payload: any): string | null => {
    if (!payload.type || !["email", "sms"].includes(payload.type)) {
      return "Invalid or missing 'type' field.";
    }
    if (!payload.message || typeof payload.message !== "string") {
      return "Invalid or missing 'message' field.";
    }
    return null;
  };
  