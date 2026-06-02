"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { translate, type TranslationDictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

type HostingPortalProps = {
  dictionary: TranslationDictionary;
};

export default function HostingPortal({ dictionary }: HostingPortalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      setError("Unable to sign in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/40">
      <h3 className="text-2xl font-semibold mb-4">
        {translate(dictionary, "hosting.dashboardTitle")}
      </h3>
      <p className="text-slate-600 leading-7 mb-6">
        {translate(dictionary, "hosting.dashboardDescription")}
      </p>

      {loading ? (
        <div className="text-slate-600">
          {translate(dictionary, "hosting.loading")}
        </div>
      ) : user ? (
        <div className="space-y-5">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              {translate(dictionary, "hosting.connectedAs")}
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {user.displayName || user.email}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">
              {translate(dictionary, "hosting.activeHostingTitle")}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {translate(dictionary, "hosting.activeHostingDescription")}
            </p>
          </div>
          <Button
            type="button"
            onClick={handleSignOut}
            variant="ghost"
            className="w-full"
          >
            {translate(dictionary, "hosting.signOut")}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-slate-600">
            {translate(dictionary, "hosting.signInPrompt")}
          </p>
          <Button type="button" onClick={handleSignIn} className="w-full">
            {translate(dictionary, "hosting.signIn")}
          </Button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      )}
    </div>
  );
}
