import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/firebase", () => ({ firebaseFirestore: { name: "firestore" } }));

// Shape mirrors firebase/firestore: getDoc resolves to a DocumentSnapshot
// whose exists()/data() are prototype methods, not plain properties.
class FakeSnapshot {
  constructor(private readonly value: Record<string, unknown> | undefined) {}
  exists() { return this.value !== undefined; }
  data() { return this.value; }
}

const firestore = vi.hoisted(() => ({
  doc: vi.fn((_db: unknown, ...path: string[]) => ({ path: path.join("/") })),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  serverTimestamp: vi.fn(() => "SERVER_TS"),
}));
vi.mock("firebase/firestore", () => firestore);

import { ensureUserDocument } from "@/lib/user";
import type { User } from "firebase/auth";

const user = {
  uid: "u1",
  email: "bob@example.com",
  displayName: "Bob",
  photoURL: null,
} as unknown as User;

beforeEach(() => {
  firestore.getDoc.mockReset();
  firestore.setDoc.mockReset().mockResolvedValue(undefined);
});

describe("ensureUserDocument", () => {
  it("creates a new user document with the User role and createdAt", async () => {
    firestore.getDoc.mockResolvedValue(new FakeSnapshot(undefined));
    await ensureUserDocument(user);

    expect(firestore.doc).toHaveBeenCalledWith({ name: "firestore" }, "users", "u1");
    const [ref, data, options] = firestore.setDoc.mock.calls[0];
    expect(ref).toEqual({ path: "users/u1" });
    expect(data).toMatchObject({
      uid: "u1",
      email: "bob@example.com",
      displayName: "Bob",
      photoURL: null,
      role: "User",
      createdAt: "SERVER_TS",
    });
    expect(options).toBeUndefined();
  });

  it("merges into an existing document and preserves an Administrator role", async () => {
    firestore.getDoc.mockResolvedValue(
      new FakeSnapshot({ role: "Administrator", subscriptions: { sub_1: {} } }),
    );
    await ensureUserDocument(user);

    const [, data, options] = firestore.setDoc.mock.calls[0];
    expect(data.role).toBe("Administrator");
    expect(data).not.toHaveProperty("createdAt");
    expect(data).not.toHaveProperty("subscriptions");
    expect(options).toEqual({ merge: true });
  });

  it("defaults the role to User when an existing document has none", async () => {
    firestore.getDoc.mockResolvedValue(new FakeSnapshot({ email: "old@example.com" }));
    await ensureUserDocument(user);
    expect(firestore.setDoc.mock.calls[0][1].role).toBe("User");
  });
});
