import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";
import { getDictionary } from "@/lib/i18n";

const dict = getDictionary("en");

// ── Helpers ───────────────────────────────────────────────────────────────────

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  overrides: Partial<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }> = {}
) => {
  const values = {
    name: "Alice Tremblay",
    email: "alice@example.com",
    subject: "Website Quote",
    message: "I would like a quote.",
    ...overrides,
  };
  await user.type(
    screen.getByPlaceholderText(dict.contactPage.nameLabel),
    values.name
  );
  await user.type(
    screen.getByPlaceholderText(dict.contactPage.emailLabel),
    values.email
  );
  await user.type(
    screen.getByPlaceholderText(dict.contactPage.subjectLabel),
    values.subject
  );
  await user.type(
    screen.getByPlaceholderText(dict.contactPage.messageLabel),
    values.message
  );
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // ── Rendering ───────────────────────────────────────────────────────────────

  it("renders all four input fields", () => {
    render(<ContactForm dictionary={dict} />);
    expect(
      screen.getByPlaceholderText(dict.contactPage.nameLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(dict.contactPage.emailLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(dict.contactPage.subjectLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(dict.contactPage.messageLabel)
    ).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm dictionary={dict} />);
    expect(
      screen.getByRole("button", { name: dict.contactPage.submitButton })
    ).toBeInTheDocument();
  });

  it("does not show success or error banners on initial render", () => {
    render(<ContactForm dictionary={dict} />);
    expect(
      screen.queryByText(dict.contactPage.successMessage)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(dict.contactPage.errorMessage)
    ).not.toBeInTheDocument();
  });

  // ── Client-side validation ───────────────────────────────────────────────────

  it("shows an error and does NOT call the API when submitted empty", async () => {
    const { container } = render(<ContactForm dictionary={dict} />);

    // fireEvent.submit bypasses HTML5 `required` constraint validation so the
    // React onSubmit handler fires and we can test our JS validation branch.
    fireEvent.submit(container.querySelector("form")!);

    expect(
      screen.getByText(dict.contactPage.errorMessage)
    ).toBeInTheDocument();
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  // ── Successful submission ────────────────────────────────────────────────────

  it("calls /api/contact with the correct JSON payload", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);
    const user = userEvent.setup();

    render(<ContactForm dictionary={dict} />);
    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: dict.contactPage.submitButton })
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledOnce();
    });

    const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body as string);
    expect(body.name).toBe("Alice Tremblay");
    expect(body.email).toBe("alice@example.com");
    expect(body.subject).toBe("Website Quote");
    expect(body.message).toBe("I would like a quote.");
  });

  it("shows the success message after a 200 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
    );
    const user = userEvent.setup();

    render(<ContactForm dictionary={dict} />);
    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: dict.contactPage.submitButton })
    );

    await waitFor(() => {
      expect(
        screen.getByText(dict.contactPage.successMessage)
      ).toBeInTheDocument();
    });
  });

  it("clears the form fields after a successful submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
    );
    const user = userEvent.setup();

    render(<ContactForm dictionary={dict} />);
    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: dict.contactPage.submitButton })
    );

    await waitFor(() => {
      expect(
        screen.getByText(dict.contactPage.successMessage)
      ).toBeInTheDocument();
    });

    expect(
      screen.getByPlaceholderText(dict.contactPage.nameLabel)
    ).toHaveValue("");
    expect(
      screen.getByPlaceholderText(dict.contactPage.emailLabel)
    ).toHaveValue("");
  });

  // ── API error handling ───────────────────────────────────────────────────────

  it("shows the error message when the API returns a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Server error" }),
      })
    );
    const user = userEvent.setup();

    render(<ContactForm dictionary={dict} />);
    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: dict.contactPage.submitButton })
    );

    await waitFor(() => {
      expect(
        screen.getByText(dict.contactPage.errorMessage)
      ).toBeInTheDocument();
    });
  });

  it("disables the submit button while the request is in flight", async () => {
    // Never resolves — simulates a long-running request
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));
    const user = userEvent.setup();

    render(<ContactForm dictionary={dict} />);
    await fillForm(user);

    const btn = screen.getByRole("button", {
      name: dict.contactPage.submitButton,
    });
    await user.click(btn);

    await waitFor(() => {
      expect(btn).toBeDisabled();
    });
  });
});
