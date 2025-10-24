const {onRequest} = require("firebase-functions/v2/https");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const next = require("next");

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const app = next({dev, conf: {distDir: ".next"}});
const handle = app.getRequestHandler();

exports.nextServer = onRequest((req, res) => {
    return app.prepare().then(() => handle(req, res));
});

exports.dailyNotification = onSchedule("every 1 hours", async (event) => {
    const db = admin.firestore();
    const tokensSnapshot = await db.collection("tokens").get();
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();

    tokensSnapshot.forEach(async (doc) => {
        const data = doc.data();
        const [hour, minute] = data.time.split(':').map(Number);

        if (hour === currentHour && minute === currentMinute) {
            const message = {
                notification: {
                    title: "Daily Reminder",
                    body: "Don't forget to check the countdown!",
                },
                token: data.token,
            };

            try {
                const response = await admin.messaging().send(message);
                console.log("Successfully sent message:", response);
            } catch (error) {
                console.log("Error sending message:", error);
            }
        }
    });
});