import { Expo } from "expo-server-sdk";
import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

if (!admin.apps.length) {
  admin.initializeApp();
}
const expo = new Expo();

export const sendTestNotification = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).send("User ID is required");
      return;
    }
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      res.status(404).send("User not found");
      return;
    }

    const userData = userDoc.data();
    const pushToken = userData?.expoPushToken;

    if (!pushToken) {
      res.status(400).send("User does not have a push token");
      return;
    }

    if (!Expo.isExpoPushToken(pushToken)) {
      res
        .status(400)
        .send(`Push token ${pushToken} is not a valid Expo push token`);
      return;
    }

    const MockMessage = [
      {
        to: pushToken,
        sound: "default" as const,
        title: "CarX",
        body: "the driver will arrive in approximately 5 min",
        data: {
          orderId: "",
          screen: "",
        },
      },
    ];

    const chunks = expo.chunkPushNotifications(MockMessage);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending chunk", error);
      }
    }

    res.status(200).json({ success: true, tickets });
  } catch (error: any) {
    console.error("Error in sendTestNotification:", error);
    res.status(500).json({ error: error.message });
  }
});
