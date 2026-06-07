import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { firebaseFirestore } from "./firebase";
import type { User } from "firebase/auth";

export async function ensureUserDocument(user: User) {
  const userRef = doc(firebaseFirestore, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  const userData = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    role: userSnapshot.exists()
      ? (userSnapshot.data()?.role as string | undefined) || "User"
      : "User",
    lastSeenAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  } as const;

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });
  } else {
    await setDoc(userRef, userData, { merge: true });
  }
}
