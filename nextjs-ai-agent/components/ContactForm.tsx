"use client";

import { useState } from "react";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success"; text: string } | { kind: "error"; text: string };

export function ContactForm({ projectOptions, successText }: { projectOptions: { value: string; label: string }[]; successText: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Please enter a valid email address so I can reply.";
    if (message.length < 20) next.message = "A couple of sentences helps me reply usefully. Please write at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus({ kind: "error", text: "Please fix the highlighted fields and try again." });
      return;
    }
    if (String(data.get("_gotcha") ?? "")) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(data)), headers: { "Content-Type": "application/json" } });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        form.reset();
        setStatus({ kind: "success", text: successText });
      } else {
        setStatus({ kind: "error", text: body.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", text: "Network problem. Please try again." });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className={"field" + (errors.name ? " is-invalid" : "")}>
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" autoComplete="name" required minLength={2} aria-invalid={!!errors.name} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className={"field" + (errors.email ? " is-invalid" : "")}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      {projectOptions.length > 0 && (
        <div className="field">
          <label htmlFor="project">What kind of project is it?</label>
          <select id="project" name="project">
            {projectOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor="link">Link (optional)</label>
        <input id="link" name="link" type="url" placeholder="https://" />
      </div>
      <div className={"field" + (errors.message ? " is-invalid" : "")}>
        <label htmlFor="message">Tell me about it</label>
        <textarea id="message" name="message" rows={6} required minLength={20} aria-invalid={!!errors.message} />
        {errors.message && <p className="error">{errors.message}</p>}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>Leave this empty<input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className="btn" type="submit" disabled={status.kind === "sending"}>{status.kind === "sending" ? "Sending..." : "Send message"}</button>
      {(status.kind === "success" || status.kind === "error") && (
        <div className={"form-status is-" + status.kind} role="status">{status.text}</div>
      )}
    </form>
  );
}
