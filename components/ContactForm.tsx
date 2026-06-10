"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type TranslationDictionary } from "@/lib/i18n";

type ContactFormProps = {
  dictionary: TranslationDictionary;
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm({ dictionary }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.subject ||
      !payload.message
    ) {
      setError(dictionary.contactPage.errorMessage);
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(dictionary.contactPage.errorMessage);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl bg-white border border-slate-100 p-8 shadow-sm"
    >
      <h2 className="text-xl font-bold text-slate-900 text-balance">
        {dictionary.contactPage.contactForm}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        {dictionary.contactPage.formNote}
      </p>

      {status === "success" && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          {dictionary.contactPage.successMessage}
        </div>
      )}

      {status === "error" && error && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-800">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span>{dictionary.contactPage.nameLabel}</span>
          <Input
            type="text"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder={dictionary.contactPage.nameLabel}
            required
          />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span>{dictionary.contactPage.emailLabel}</span>
          <Input
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder={dictionary.contactPage.emailLabel}
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-700">
        <span>{dictionary.contactPage.subjectLabel}</span>
        <Input
          type="text"
          value={form.subject}
          onChange={(event) => handleChange("subject", event.target.value)}
          placeholder={dictionary.contactPage.subjectLabel}
          required
        />
      </label>

      <label className="space-y-2 text-sm text-slate-700">
        <span>{dictionary.contactPage.messageLabel}</span>
        <textarea
          value={form.message}
          onChange={(event) => handleChange("message", event.target.value)}
          placeholder={dictionary.contactPage.messageLabel}
          required
          rows={6}
          className="min-h-[160px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </label>

      <Button
        type="submit"
        className="w-full"
        disabled={status === "submitting"}
      >
        {dictionary.contactPage.submitButton}
      </Button>
    </form>
  );
}
