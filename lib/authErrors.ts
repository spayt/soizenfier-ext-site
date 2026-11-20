/** Firebase Auth error code of an unknown error, if any. */
export function authErrorCode(err: unknown): string | undefined {
  const code = (err as { code?: unknown } | null)?.code;
  return typeof code === "string" ? code : undefined;
}

/**
 * User-facing message for a failed Google popup sign-in, or null when the
 * user simply closed the popup (nothing to report).
 */
export function googleSignInErrorMessage(err: unknown): string | null {
  switch (authErrorCode(err)) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
    case "auth/user-cancelled":
      return null;
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in window. Allow pop-ups for this site and try again.";
    case "auth/unauthorized-domain":
      return "Google sign-in is not available on this address yet. Please sign in with your email and password.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email. Sign in with your email and password.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Google sign-in failed. Please try again.";
  }
}
