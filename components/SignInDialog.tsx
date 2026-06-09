"use client";

import { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AuthStep = "signin" | "register" | "verify-code";

type SignInDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// ── Shared sub-components (declared outside to satisfy React 19) ──────────────

function GoogleButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60"
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs text-slate-400">
          <span className="bg-white px-2">or</span>
        </div>
      </div>
    </>
  );
}

function Field({
  label, id, type, autoComplete, value, onChange, placeholder,
}: {
  label: string; id: string; type: string; autoComplete?: string;
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-medium text-slate-600">{label}</label>
      <Input
        id={id} type={type} autoComplete={autoComplete} required
        value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-rose-600">{children}</p>;
}

function SubmitBtn({
  loading, disabled, children,
}: {
  loading: boolean; disabled?: boolean; children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors disabled:opacity-60"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}

// ── Main dialog ───────────────────────────────────────────────────────────────

export default function SignInDialog({ open, onOpenChange }: SignInDialogProps) {
  const [step, setStep] = useState<AuthStep>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setStep("signin");
    setName("");
    setEmail("");
    setPassword("");
    setCode("");
    setError(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  // ── Google sign-in ────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
      onOpenChange(false);
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Sign-in with email/password ───────────────────────────────────────────
  const handleSignIn = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      onOpenChange(false);
    } catch (err) {
      const fbCode = (err as { code?: string }).code;
      if (
        fbCode === "auth/user-not-found" ||
        fbCode === "auth/wrong-password" ||
        fbCode === "auth/invalid-credential"
      ) {
        setError("Invalid email or password.");
      } else if (fbCode === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Step 1: request verification code ────────────────────────────────────
  const handleSendCode = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/email/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to send code.");
        return;
      }
      setStep("verify-code");
    } catch {
      setError("Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Resend code ───────────────────────────────────────────────────────────
  const handleResendCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/email/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Failed to resend code.");
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify code → create account ─────────────────────────────────
  const handleVerifyAndCreate = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (code.length !== 6) { setError("Please enter the full 6-digit code."); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/email/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Verification failed.");
        return;
      }
      const { user: newUser } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      if (name.trim()) {
        await updateProfile(newUser, { displayName: name.trim() });
      }
      onOpenChange(false);
    } catch (err) {
      const fbCode = (err as { code?: string }).code;
      if (fbCode === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in.");
      } else if (fbCode === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Account creation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-sm"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >

        {/* ── Sign in ── */}
        {step === "signin" && (
          <>
            <DialogHeader>
              <DialogTitle>Sign in to continue</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-1">
              <GoogleButton onClick={handleGoogleSignIn} disabled={loading} />
              <form onSubmit={handleSignIn} className="space-y-3">
                <Field label="Email" id="si-email" type="email" autoComplete="email"
                  value={email} onChange={setEmail} placeholder="you@example.com" />
                <Field label="Password" id="si-password" type="password" autoComplete="current-password"
                  value={password} onChange={setPassword} placeholder="••••••••" />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <SubmitBtn loading={loading}>Sign in</SubmitBtn>
              </form>
              <p className="text-center text-xs text-slate-500">
                No account?{" "}
                <button type="button" onClick={() => { setStep("register"); setError(null); }}
                  className="font-semibold text-slate-800 hover:underline">
                  Create one
                </button>
              </p>
            </div>
          </>
        )}

        {/* ── Register: name + email + password → send code ── */}
        {step === "register" && (
          <>
            <DialogHeader>
              <DialogTitle>Create an account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-1">
              <GoogleButton onClick={handleGoogleSignIn} disabled={loading} />
              <form onSubmit={handleSendCode} className="space-y-3">
                <Field label="Full name" id="reg-name" type="text" autoComplete="name"
                  value={name} onChange={setName} placeholder="Jane Doe" />
                <Field label="Email" id="reg-email" type="email" autoComplete="email"
                  value={email} onChange={setEmail} placeholder="you@example.com" />
                <Field label="Password" id="reg-password" type="password" autoComplete="new-password"
                  value={password} onChange={setPassword} placeholder="Min. 6 characters" />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <SubmitBtn loading={loading}>Send verification code</SubmitBtn>
              </form>
              <p className="text-center text-xs text-slate-500">
                Already have an account?{" "}
                <button type="button" onClick={() => { setStep("signin"); setError(null); }}
                  className="font-semibold text-slate-800 hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          </>
        )}

        {/* ── Verify 6-digit code ── */}
        {step === "verify-code" && (
          <>
            <DialogHeader>
              <DialogTitle>Check your inbox</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 pt-1">
              <p className="text-sm text-slate-500 leading-relaxed">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-slate-800">{email}</span>.
                Enter it below — it expires in 10 minutes.
              </p>

              <form onSubmit={handleVerifyAndCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="verify-code" className="text-xs font-medium text-slate-600">
                    Verification code
                  </label>
                  <Input
                    id="verify-code"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    autoComplete="one-time-code"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setError(null);
                    }}
                    className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                  />
                </div>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <SubmitBtn loading={loading} disabled={code.length !== 6}>
                  Verify &amp; create account
                </SubmitBtn>
              </form>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() => { setStep("register"); setCode(""); setError(null); }}
                  className="hover:text-slate-800 transition-colors"
                >
                  ← Change email
                </button>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  className="font-semibold text-slate-700 hover:underline disabled:opacity-50 transition-colors"
                >
                  Resend code
                </button>
              </div>
            </div>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
}
