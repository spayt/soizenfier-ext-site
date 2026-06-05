import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initializeFirebaseApp(): FirebaseApp {
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.projectId ||
    !firebaseConfig.appId
  ) {
    throw new Error(
      "Firebase configuration is missing. Add the required NEXT_PUBLIC_FIREBASE_* env vars.",
    );
  }

  return !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

const app = initializeFirebaseApp();

export const firebaseApp = app;
export const firebaseAuth = getAuth(app);
export const firebaseFirestore = getFirestore(app);
export const firebaseStorage = getStorage(app);

const useEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true";

if (useEmulators && typeof window !== "undefined") {
  const authEmulatorUrl =
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL ||
    "http://localhost:9099";
  connectAuthEmulator(firebaseAuth, authEmulatorUrl, {
    disableWarnings: true,
  });

  const firestoreHost =
    process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST?.split(":")[0] ||
    "localhost";
  const firestorePort = Number(
    process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST?.split(":")[1] ||
      "8080",
  );
  connectFirestoreEmulator(firebaseFirestore, firestoreHost, firestorePort);

  const storageHost =
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST?.split(":")[0] ||
    "localhost";
  const storagePort = Number(
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST?.split(":")[1] ||
      "9199",
  );
  connectStorageEmulator(firebaseStorage, storageHost, storagePort);
}
