export interface PushRegistrationResult {
  isGranted: boolean;
  token: string | null;
}

export interface PushNotificationMessage {
  title: string;
  body: string;
  sound?: string;
  data: {
    id: string;
    type?: string;
    screen?: string;
    entityId?: string;
  };
}

export interface PushNotificationState {
  isGranted: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SaveExpoPushTokenError {
  message: string;
  type: string;
}
