## Returned Notification Service API

This project provides an API using AWS Lambda to handle notifications (email and SMS). It includes payload validation, modular handlers for HTTP requests, and unit tests with Jest. The architecture is designed for seamless development and deployment, locally and on AWS.

---

## **Project Structure**

```plaintext
source/
  ├── handlers/
  │     ├── getNotifications.ts        # Handles fetching notifications
  │     └── processNotification.ts     # Handles notification processing
  ├── interfaces/
  │     └── notification.ts            # Types and interfaces for notifications
  ├── utils/
  │     ├── logger.ts                  # Logging utility
  │     └── validatePayload.ts         # Validates notification payloads
  └── index.ts                         # Exports Lambda handlers
tests/
  ├── getNotifications.test.ts         # Tests for `getNotifications`
  ├── postNotification.test.ts         # Tests for `processNotification`
  └── validatePayload.test.ts          # Tests for `validateNotificationPayload`
template.yaml                          # AWS SAM configuration file
```

---

## **Requirements**

*   **Node.js**: Version 16 or higher.
*   **AWS SAM CLI**: For local testing.
*   **npm**: To manage dependencies and scripts.

---

## **Setup and Installation**

1.  If apply, Clone the repository:
    
    ```plaintext
    git clone https://github.com/anfegu/returned-assessment.git
    cd returned-notification-lambda-service
    ```
    
2.  Install dependencies:
    
    ```plaintext
    npm install
    ```
    

---

## **Running Locally**

Using AWS SAM CLI, simulate the API locally:

1.  Start the API:
    
    ```plaintext
    sam local start-api
    ```
    
2.  Access endpoints at http://localhost:3000.
    
    **Available Endpoints**
    
    <table><tbody><tr><td style="background-color:var(--border-light);border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:0px;border-top-width:1px;padding:0.25rem 0.75rem;vertical-align:bottom;"><strong>Method</strong></td><td style="background-color:var(--border-light);border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:0px;border-top-width:1px;padding:0.25rem 0.75rem;vertical-align:bottom;"><strong>Path</strong></td><td style="background-color:var(--border-light);border-color:var(--border-medium);padding:0.25rem 0.75rem;vertical-align:bottom;"><strong>Description</strong></td></tr><tr><td style="border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:0px;border-top-width:0px;padding:0.25rem 0.75rem;">POST</td><td style="border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:0px;border-top-width:0px;padding:0.25rem 0.75rem;"><code>/notifications</code></td><td style="border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:1px;border-top-width:0px;padding:0.25rem 0.75rem;">Process a received notification</td></tr><tr><td style="border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:0px;border-top-width:0px;padding:0.25rem 0.75rem;">GET</td><td style="border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:0px;border-top-width:0px;padding:0.25rem 0.75rem;"><code>/notifications</code></td><td style="border-bottom-width:1px;border-color:var(--border-medium);border-left-width:1px;border-right-width:1px;border-top-width:0px;padding:0.25rem 0.75rem;">Fetch simulated notifications</td></tr></tbody></table>
    

### **Checking the API with Curl**

### **1\. POST Notification**

Send a POST request to process a notification (e.g., email or SMS):

```plaintext
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email",
    "message": "Test email message",
    "address": "test@example.com",
    "subject": "Test subject"
  }'
```

### **2\. GET Notifications**

Fetch all notifications:

```plaintext
curl http://localhost:3000/notifications
```

---

## **Running Unit Tests**

### **Setup Jest**

Ensure Jest and its dependencies are installed:

```plaintext
npm install --save-dev jest @types/jest ts-jest
```

### **Run Tests**

Run all unit tests:

```plaintext
npm test
```

---

## **API Details**

### **Handlers**

*   **getNotifications**: Simulates fetching a list of notifications (email and SMS types).
*   **processNotification**: Validates and processes incoming notifications (email or SMS) with validation for required fields.

### **Utilities**

*   **logger.ts**: Provides utility functions to log messages (info, error) to the console.
*   **validatePayload.ts**: Validates notification payloads based on type (email or SMS) and required fields.

### **Validation Logic**

For the `validateNotificationPayload` function:

*   **Type**: Should be either `email` or `sms`.
*   **Message**: Should be a non-empty string.
*   **Email**: Requires `address` and `subject` if the type is `email`.
*   **SMS**: Requires `countryCode` and `phoneNumber` if the type is `sms`.

---

## **Sample Payloads**

**Valid Email Payload:**

```plaintext
{
  "type": "email",
  "message": "Test email message",
  "address": "test@example.com",
  "subject": "Test subject"
}
```

**Valid SMS Payload:**

```plaintext
{
  "type": "sms",
  "message": "Test SMS message",
  "countryCode": "+57",
  "phoneNumber": "30458887872"
}
```

---

## **Test Cases for Payload Validation**

### **Test: Valid Payload**

For a valid payload, the function should return `null`.

### **Test: Missing Type**

If the `type` field is missing, the validation should return the corresponding error message.

### **Test: Invalid Type**

If the `type` is invalid (not `email` or `sms`), the validation should return an error message.

### **Test: Missing Message**

If the `message` field is missing, the validation should return an error message.

---

## **Deployment to AWS**

To deploy the application to AWS, run the following command:

```plaintext
sam deploy --guided
```

Follow the prompts to deploy the Lambda function and API Gateway. After deployment, you'll receive the API URL to interact with the service online.