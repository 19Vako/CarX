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
        const { amount, currency, firebaseUID, email, name } = req.body;

        let stripeCustomerId;

        const existingCustomers = await stripe.customers.list({
          email: email,
          limit: 1,
        });

        if (existingCustomers.data.length > 0) {
          stripeCustomerId = existingCustomers.data[0].id;
        } else {
          const newCustomer = await stripe.customers.create({
            email: email,
            name: name,
            metadata: {
              firebaseUID: firebaseUID,
            },
          });
          stripeCustomerId = newCustomer.id;
        }

        const ephemeralKey = await stripe.ephemeralKeys.create(
          { customer: stripeCustomerId },
          { apiVersion: "2023-10-16" },
        );

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: currency,
          customer: stripeCustomerId,
          automatic_payment_methods: { enabled: true },
        });

        res.json({
          paymentIntent: paymentIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer: stripeCustomerId,
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });
  },
);
