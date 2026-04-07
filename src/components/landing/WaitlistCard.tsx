import { useState } from "react";
import type { FormEvent } from "react";

type WaitlistCardProps = {
  className?: string;
};

export function WaitlistCard({ className = "" }: WaitlistCardProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl =
        import.meta.env.MODE === "development"
          ? "http://localhost:3000/api/waitlist"
          : "/api/waitlist";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join waitlist");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit to waitlist:", err);
      setError(
        err instanceof Error ? err.message : "Failed to join waitlist. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      id="join"
      className={`rounded-2xl border border-[#d9d2c4] bg-[#fffaf1] p-5 shadow-xl shadow-[#263b37]/10 ${className}`}
      aria-label="Join waitlist"
    >
      <h2 className="font-['Space_Grotesk'] text-2xl font-bold">
        Join the waitlist
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#5c6967]">
        Email-only signup for launch access and product updates.
      </p>

      {submitted ? (
        <div className="mt-4 rounded-xl border border-[#c0e2db] bg-[#e8f7f3] p-4">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#1f3934]">
            You are on the list.
          </h3>
          <p className="mt-1 text-sm text-[#48635f]">
            We will reach out when the next invite window opens.
          </p>
        </div>
      ) : (
        <>
          {error && (
            <div className="mt-4 rounded-xl border border-[#e6b0a3] bg-[#fef3f1] p-3">
              <p className="text-sm text-[#c44c3a]">{error}</p>
            </div>
          )}
          </>
      )}
      {!submitted && (
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#304543]"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-[#cbc3b5] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0f8f7b] focus:ring-2 focus:ring-[#0f8f7b]/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-br from-[#0f8f7b] to-[#14ad95] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#0f8f7b]/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Joining..." : "Reserve My Spot"}
          </button>
          <p className="text-xs text-[#667270]">
            No spam. Unsubscribe any time.
          </p>
        </form>
      )}
    </aside>
  );
}
