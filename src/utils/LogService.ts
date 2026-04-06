import * as Sentry from "@sentry/react-native";
import reactotron from "reactotron-react-native";

type LogContext = {
  stage: string;
  err?: string;
};

export const LogService = {
  error(err: any, type: string, context?: LogContext) {
    reactotron.display({
      name: "Error",
      preview: `${err}`,
      value: { type, ...context },
    });
    Sentry.captureException(err, {
      tags: { type },
      extra: { ...context },
    });
  },

  warn(message: string, type: string, context?: LogContext) {
    reactotron.display({
      name: "Warning",
      preview: message,
      value: { type, ...context },
    });
    Sentry.captureMessage(message, {
      level: "warning",
      tags: { type },
      extra: { ...context },
    });
  },
};
