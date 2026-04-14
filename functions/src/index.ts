import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import Stripe from "stripe";

const corsHandler = cors({ origin: true });

export const paymentSheet = onRequest(
  { secrets: ["STRIPE_SECRET_KEY"] },
  (req, res) => {
    corsHandler(req, res, async () => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-03-25.dahlia",
      });

      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      try {
        const { amount, currency } = req.body;

        const customer = await stripe.customers.create();

        const ephemeralKey = await stripe.ephemeralKeys.create(
          { customer: customer.id },
          { apiVersion: "2023-10-16" },
        );

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: currency,
          customer: customer.id,
          automatic_payment_methods: { enabled: true },
        });

        res.json({
          paymentIntent: paymentIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer: customer.id,
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });
  },
);
