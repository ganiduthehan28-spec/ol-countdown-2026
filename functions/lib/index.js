"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotifications = void 0;
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
if (!admin.apps.length) {
    admin.initializeApp();
}
const examDate = new Date("2026-12-01T00:00:00"); // set your O/L exam date
exports.sendPushNotifications = (0, https_1.onRequest)(async (request, response) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    const snapshot = await admin.firestore().collection("fcmTokens").where("time", "==", currentTime).get();
    if (snapshot.empty) {
        logger.info("No users to notify at this time.");
        response.send("No users to notify at this time.");
        return;
    }
    const tokens = [];
    snapshot.forEach(doc => {
        tokens.push(doc.data().token);
    });
    const notificationTitle = "O/L Countdown 2026 🔔";
    const notificationBody = `${diffDays} Days Remaining! Click to open the countdown.`;
    try {
        for (const token of tokens) {
            const message = {
                notification: { title: notificationTitle, body: notificationBody },
                webpush: { fcmOptions: { link: "https://ol-countdown-9a.netlify.app/" } },
                token,
            };
            await admin.messaging().send(message);
        }
        logger.info(`Successfully sent notifications to ${tokens.length} users.`);
        response.send(`Successfully sent notifications to ${tokens.length} users.`);
    }
    catch (error) {
        logger.error("Error sending notifications:", error);
        response.status(500).send("Error sending notifications");
    }
});
//# sourceMappingURL=index.js.map