// types.ts

export namespace PaymentSheet {
  export interface SetupParams {
    paymentIntentClientSecret?: string;
    setupIntentClientSecret?: string;
    customerId?: string;
    customerEphemeralKeySecret?: string;
    merchantDisplayName?: string;
    applePay?: any;
    googlePay?: any;
    style?: "alwaysLight" | "alwaysDark" | "automatic";
    returnURL?: string;
    allowsDelayedPaymentMethods?: boolean;
    defaultBillingDetails?: BillingDetails;
    appearance?: any;
  }

  export interface PresentOptions {
    timeout?: number;
  }
}
export namespace PaymentMethod {
  export type Type = "Card" | "Unknown";

  export interface Result {
    id: string;
    liveMode: boolean;
    customerId: string;
    billingDetails: BillingDetails;
    paymentMethodType: Type;
    Card: CardResult;
  }

  export interface CardResult {
    brand?: string; // Можно использовать CardBrand если нужно
    country?: string;
    expYear?: number;
    expMonth?: number;
    fingerprint?: string;
    funding?: string;
    last4?: string;
  }

  export type CreateParams = CardParams;
  export type ConfirmParams = CreateParams;

  export type CardParams =
    | {
        paymentMethodType: "Card";
        paymentMethodData?: {
          token?: string;
          billingDetails?: BillingDetails;
        };
      }
    | {
        paymentMethodType: "Card";
        paymentMethodData: {
          paymentMethodId: string;
          cvc?: string;
          billingDetails?: BillingDetails;
        };
      };

  export type CreateOptions = {
    setupFutureUsage?: "OffSession" | "OnSession";
  };

  export type ConfirmOptions = CreateOptions;
}

// Если BillingDetails еще не определен в твоем файле:
export interface BillingDetails {
  email?: string;
  phone?: string;
  name?: string;
  address?: Address;
}

export interface BillingDetails {
  email?: string;
  phone?: string;
  name?: string;
  address?: Address;
}

export interface Address {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postalCode?: string;
  state?: string;
}

export interface StripeError<T> {
  code: T;
  message: string;
  localizedMessage?: string;
  declineCode?: string;
  stripeErrorCode?: string;
}

export enum PaymentSheetError {
  Failed = "Failed",
  Canceled = "Canceled",
  Timeout = "Timeout",
}

export type InitPaymentSheetResult = { error?: StripeError<PaymentSheetError> };
export type PresentPaymentSheetResult = {
  error?: StripeError<PaymentSheetError>;
};
