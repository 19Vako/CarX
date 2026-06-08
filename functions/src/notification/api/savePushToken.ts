import cors from "cors";
import { Expo } from "expo-server-sdk";
import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

const corsHandler = cors({ origin: true });

if (!admin.apps.length) {
  admin.initializeApp();
}

export const savePushToken = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      res
        .status(405)
        .json({ error: "Method Not Allowed", type: "Wrong method" });
      return;
    }

    try {
      const { userId, token } = req.body;
      if (!userId || !token) {
        res
          .status(400)
          .json({ error: "Missing userId or token", type: "Firestore" });
        return;
      }

      if (!Expo.isExpoPushToken(token)) {
        res
          .status(400)
          .json({ error: "Invalid Expo push token", type: "Expo services" });
        return;
      }

      await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set({ expoPushToken: token }, { merge: true });

      res
        .status(200)
        .json({ success: true, message: "Push token saved successfully" });
    } catch (error: any) {
      console.error("Error saving push token:", error);
      res.status(500).json({ error: error.message, type: error.type });
    }
  });
});
