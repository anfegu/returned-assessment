export type NotificationType = 'email' | 'sms';

export interface CoreNotification {
  message: string;
  type: NotificationType;
}

export interface EmailNotification extends CoreNotification {
  address: string;
  subject: string;
  type: 'email';
}

export interface SMSNotification extends CoreNotification {
  countryCode: string;
  phoneNumber: string;
  type: 'sms';
}

export type Notification = EmailNotification | SMSNotification;

export interface NotificationHttpResponse {
  body: { error?: boolean; message: string } | string;
  statusCode: number;
}
