"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function RsvpForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    const webhookUrl = process.env.NEXT_PUBLIC_RSVP_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        setState("success");
      } catch {
        setState("error");
      }
    } else {
      await new Promise((r) => setTimeout(r, 800));
      setState("success");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <p className="font-serif text-3xl text-black mb-3">Parfait, à bientôt.</p>
        <p className="text-light-brown text-base">
          Nous revenons vers vous avec les détails pratiques avant le 19 juin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-light-brown font-medium">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="Jean"
            className="bg-white border border-dark-gray rounded-sm px-4 py-3 text-sm text-black placeholder:text-dark-gray focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-light-brown font-medium">
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Dupont"
            className="bg-white border border-dark-gray rounded-sm px-4 py-3 text-sm text-black placeholder:text-dark-gray focus:outline-none focus:border-black transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs uppercase tracking-widest text-light-brown font-medium">
          Adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jean@entreprise.com"
          className="bg-white border border-dark-gray rounded-sm px-4 py-3 text-sm text-black placeholder:text-dark-gray focus:outline-none focus:border-black transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-xs uppercase tracking-widest text-light-brown font-medium">
          Entreprise
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Acme SA"
          className="bg-white border border-dark-gray rounded-sm px-4 py-3 text-sm text-black placeholder:text-dark-gray focus:outline-none focus:border-black transition-colors"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-center" style={{ color: "#c0392b" }}>
          Une erreur est survenue. Contactez-nous à{" "}
          <a href="mailto:c@meetwonka.com" className="underline">
            c@meetwonka.com
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-2 bg-black text-white text-sm uppercase tracking-widest font-medium px-8 py-4 hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {state === "loading" ? "Envoi…" : "Confirmer ma place →"}
      </button>

      <p className="text-center text-xs text-light-brown mt-1">
        Inscriptions closes le 19 juin 2026 · Places limitées
      </p>
    </form>
  );
}
