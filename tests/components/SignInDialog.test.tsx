import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/firebase", () => ({ firebaseAuth: { name: "auth" } }));
const fbAuth = vi.hoisted(() => ({
  signInWithPopup: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  GoogleAuthProvider: class GoogleAuthProvider {},
}));
vi.mock("firebase/auth", () => fbAuth);

import SignInDialog from "@/components/SignInDialog";

const authError = (code: string) => Object.assign(new Error(code), { code });
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

let onOpenChange: ReturnType<typeof vi.fn>;

function renderDialog() {
  onOpenChange = vi.fn();
  return render(<SignInDialog open onOpenChange={onOpenChange} />);
}

async function fillRegistration(name = "Jane Doe") {
  await userEvent.click(screen.getByRole("button", { name: "Create one" }));
  await userEvent.type(screen.getByLabelText("Full name"), name);
  await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
  await userEvent.type(screen.getByLabelText("Password"), "secret123");
}

beforeEach(() => {
  for (const fn of [fbAuth.signInWithPopup, fbAuth.signInWithEmailAndPassword, fbAuth.createUserWithEmailAndPassword, fbAuth.updateProfile, fbAuth.sendPasswordResetEmail]) {
    fn.mockReset();
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("SignInDialog — sign in", () => {
  it("signs in with email and password and closes", async () => {
    fbAuth.signInWithEmailAndPassword.mockResolvedValue({ user: {} });
    renderDialog();
    await userEvent.type(screen.getByLabelText("Email"), "bob@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "secret123");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(fbAuth.signInWithEmailAndPassword).toHaveBeenCalledWith({ name: "auth" }, "bob@example.com", "secret123");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it.each([
    ["auth/invalid-credential", "Invalid email or password."],
    ["auth/wrong-password", "Invalid email or password."],
    ["auth/user-not-found", "Invalid email or password."],
    ["auth/invalid-email", "Please enter a valid email address."],
    ["auth/network-request-failed", "Sign-in failed. Please try again."],
  ])("maps %s to a readable message", async (code, message) => {
    fbAuth.signInWithEmailAndPassword.mockRejectedValue(authError(code));
    renderDialog();
    await userEvent.type(screen.getByLabelText("Email"), "bob@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "badpass");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("signs in with Google", async () => {
    fbAuth.signInWithPopup.mockResolvedValue({ user: {} });
    renderDialog();
    await userEvent.click(screen.getByRole("button", { name: "Continue with Google" }));
    expect(fbAuth.signInWithPopup.mock.calls[0][1]).toBeInstanceOf(fbAuth.GoogleAuthProvider);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it.each([
    ["auth/unauthorized-domain", "Google sign-in is not available on this address yet. Please sign in with your email and password."],
    ["auth/popup-blocked", "Your browser blocked the Google sign-in window. Allow pop-ups for this site and try again."],
    ["auth/network-request-failed", "Network error. Check your connection and try again."],
    ["auth/internal-error", "Google sign-in failed. Please try again."],
  ])("explains a Google sign-in failure (%s)", async (code, message) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fbAuth.signInWithPopup.mockRejectedValue(authError(code));
    renderDialog();
    await userEvent.click(screen.getByRole("button", { name: "Continue with Google" }));
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("shows no error when the user closes the Google popup", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fbAuth.signInWithPopup.mockRejectedValue(authError("auth/popup-closed-by-user"));
    renderDialog();
    await userEvent.click(screen.getByRole("button", { name: "Continue with Google" }));
    expect(screen.queryByText(/failed|error/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue with Google" })).toBeEnabled();
  });
});

describe("SignInDialog — registration with email verification", () => {
  it("sends a code, verifies it, then creates the account with the display name", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json({ sent: true }))
      .mockResolvedValueOnce(json({ verified: true }));
    vi.stubGlobal("fetch", fetchMock);
    const newUser = { uid: "new" };
    fbAuth.createUserWithEmailAndPassword.mockResolvedValue({ user: newUser });
    fbAuth.updateProfile.mockResolvedValue(undefined);

    renderDialog();
    await fillRegistration("  Jane Doe  ");
    await userEvent.click(screen.getByRole("button", { name: "Send verification code" }));

    expect(await screen.findByText("Check your inbox")).toBeInTheDocument();
    expect(fetchMock.mock.calls[0][0]).toBe("/api/email/send-verification");
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ email: "jane@example.com" });
    // No account is created before the code is verified
    expect(fbAuth.createUserWithEmailAndPassword).not.toHaveBeenCalled();

    await userEvent.type(screen.getByLabelText("Verification code"), "12a3456");
    expect(screen.getByLabelText("Verification code")).toHaveValue("123456");
    await userEvent.click(screen.getByRole("button", { name: "Verify & create account" }));

    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({ email: "jane@example.com", code: "123456" });
    expect(fbAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith({ name: "auth" }, "jane@example.com", "secret123");
    expect(fbAuth.updateProfile).toHaveBeenCalledWith(newUser, { displayName: "Jane Doe" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("keeps the verify button disabled until 6 digits are entered", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json({ sent: true })));
    renderDialog();
    await fillRegistration();
    await userEvent.click(screen.getByRole("button", { name: "Send verification code" }));
    await userEvent.type(await screen.findByLabelText("Verification code"), "123");
    expect(screen.getByRole("button", { name: "Verify & create account" })).toBeDisabled();
  });

  it("shows the server error when the code cannot be sent (e.g. rate limit)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json({ error: "Too many requests." }, 429)));
    renderDialog();
    await fillRegistration();
    await userEvent.click(screen.getByRole("button", { name: "Send verification code" }));
    expect(await screen.findByText("Too many requests.")).toBeInTheDocument();
    expect(screen.queryByText("Check your inbox")).not.toBeInTheDocument();
  });

  it("does not create the account when the code is wrong", async () => {
    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce(json({ sent: true }))
      .mockResolvedValueOnce(json({ error: "Incorrect code. Please check and try again." }, 400)));
    renderDialog();
    await fillRegistration();
    await userEvent.click(screen.getByRole("button", { name: "Send verification code" }));
    await userEvent.type(await screen.findByLabelText("Verification code"), "000000");
    await userEvent.click(screen.getByRole("button", { name: "Verify & create account" }));

    expect(await screen.findByText("Incorrect code. Please check and try again.")).toBeInTheDocument();
    expect(fbAuth.createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it.each([
    ["auth/email-already-in-use", "An account with this email already exists. Please sign in."],
    ["auth/weak-password", "Password must be at least 6 characters."],
    ["auth/internal-error", "Account creation failed. Please try again."],
  ])("maps account creation error %s", async (code, message) => {
    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce(json({ sent: true }))
      .mockResolvedValueOnce(json({ verified: true })));
    fbAuth.createUserWithEmailAndPassword.mockRejectedValue(authError(code));
    renderDialog();
    await fillRegistration();
    await userEvent.click(screen.getByRole("button", { name: "Send verification code" }));
    await userEvent.type(await screen.findByLabelText("Verification code"), "123456");
    await userEvent.click(screen.getByRole("button", { name: "Verify & create account" }));
    expect(await screen.findByText(message)).toBeInTheDocument();
  });

  it("can resend the code and go back to change the email", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ sent: true }));
    vi.stubGlobal("fetch", fetchMock);
    renderDialog();
    await fillRegistration();
    await userEvent.click(screen.getByRole("button", { name: "Send verification code" }));

    await userEvent.click(await screen.findByRole("button", { name: "Resend code" }));
    expect(fetchMock).toHaveBeenCalledTimes(2);

    await userEvent.click(screen.getByRole("button", { name: "← Change email" }));
    expect(screen.getByText("Create an account")).toBeInTheDocument();
  });
});

describe("SignInDialog — forgot password", () => {
  async function openReset(email = "bob@example.com") {
    renderDialog();
    await userEvent.type(screen.getByLabelText("Email"), email);
    await userEvent.click(screen.getByRole("button", { name: "Forgot password?" }));
  }

  it("sends a reset link to the email typed on the sign-in form", async () => {
    fbAuth.sendPasswordResetEmail.mockResolvedValue(undefined);
    await openReset();
    expect(screen.getByLabelText("Email")).toHaveValue("bob@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    expect(fbAuth.sendPasswordResetEmail).toHaveBeenCalledWith({ name: "auth" }, "bob@example.com");
    expect(screen.getByText(/you.ll\s+receive a link to reset your password/)).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("does not reveal whether the account exists", async () => {
    fbAuth.sendPasswordResetEmail.mockRejectedValue(authError("auth/user-not-found"));
    await openReset("nobody@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Send reset link" }));
    expect(screen.getByRole("heading", { name: "Check your inbox" })).toBeInTheDocument();
  });

  it.each([
    ["auth/invalid-email", "Please enter a valid email address."],
    ["auth/too-many-requests", "Too many attempts. Please wait a few minutes and try again."],
    ["auth/internal-error", "Could not send the reset email. Please try again."],
  ])("shows an error for %s", async (code, message) => {
    fbAuth.sendPasswordResetEmail.mockRejectedValue(authError(code));
    await openReset();
    await userEvent.click(screen.getByRole("button", { name: "Send reset link" }));
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reset your password" })).toBeInTheDocument();
  });

  it("goes back to the sign-in form", async () => {
    fbAuth.sendPasswordResetEmail.mockResolvedValue(undefined);
    await openReset();
    await userEvent.click(screen.getByRole("button", { name: "Send reset link" }));
    await userEvent.click(screen.getByRole("button", { name: "Back to sign in" }));
    expect(screen.getByRole("heading", { name: "Sign in to continue" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveValue("bob@example.com");
  });
});
