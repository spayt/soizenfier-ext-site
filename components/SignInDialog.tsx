"use client";

import { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AuthMode = "signin" | "register";

type SignInDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SignInDialog({ open, onOpenChange }: SignInDialogProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const reset = () => {
    setAuthMode("signin");
    setEmail("");
    setPassword("");
    setAuthError(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
    onOpenChange(open);
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      onOpenChange(false);
    } catch {
      setAuthError("Google sign-in failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (authMode === "signin") {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      } else {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      }
      onOpenChange(false);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        setAuthError("Invalid email or password.");
      } else if (code === "auth/email-already-in-use") {
        setAuthError("An account with this email already exists. Please sign in.");
      } else if (code === "auth/weak-password") {
        setAuthError("Password must be at least 6 characters.");
      } else if (code === "auth/invalid-email") {
        setAuthError("Please enter a valid email address.");
      } else {
        setAuthError("Authentication failed. Please try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {authMode === "signin" ? "Sign in to continue" : "Create an account"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={authLoading}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-400">
              <span className="bg-white px-2">or</span>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="sign-in-email" className="text-xs font-medium text-slate-600">
                Email
              </label>
              <Input
                id="sign-in-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="sign-in-password" className="text-xs font-medium text-slate-600">
                Password
              </label>
              <Input
                id="sign-in-password"
                type="password"
                autoComplete={authMode === "signin" ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {authError && <p className="text-xs text-rose-600">{authError}</p>}

            <Button type="submit" className="w-full" disabled={authLoading}>
              {authLoading
                ? "Please wait…"
                : authMode === "signin"
                ? "Sign in"
                : "Create account"}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500">
            {authMode === "signin" ? (
              <>
                No account?{" "}
                <button
                  type="button"
                  onClick={() => { setAuthMode("register"); setAuthError(null); }}
                  className="font-medium text-slate-700 hover:underline"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setAuthMode("signin"); setAuthError(null); }}
                  className="font-medium text-slate-700 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
