import { useReveal } from "../../hooks/useReveal";
import { WaitlistCard } from "./WaitlistCard";

export function ConsumerHero() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      ref={reveal.ref}
      className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 pb-8 pt-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:pb-14 md:pt-14"
    >
      <div
        className={`space-y-5 transition-all duration-700 ${reveal.visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      >
        <p className="inline-flex rounded-full border border-[#8cbeb6] bg-[#e4f3f0] px-3 py-1 text-xs font-bold tracking-widest text-[#0b7567]">
          SEMANTIC VECTOR MATCHING
        </p>
        <h1 className="max-w-2xl font-['Space_Grotesk'] text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Find your intellectual twin. Skip the small talk.
        </h1>
        <p className="max-w-2xl text-[1.02rem] leading-7 text-[#596866]">
          Tired of picking tags that don't capture how you think? We use AI to
          turn your words into a vector—then find people who speak your
          language. For solo-builders, founders, and niche thinkers who are done
          networking in a vacuum.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#join"
            className="rounded-full bg-[#182725] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#182725]/20 transition hover:-translate-y-0.5"
          >
            Join Waitlist
          </a>
          <a
            href="#how"
            className="rounded-full border border-[#c5beb0] bg-[#fffaf1] px-6 py-3 text-sm font-semibold text-[#263734] transition hover:border-[#0f8f7b] hover:text-[#0f8f7b]"
          >
            See How It Works
          </a>
        </div>
        <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-[#456260]">
          <span className="rounded-full border border-[#cde0d9] bg-[#eff7f5] px-3 py-1">
            Vector-based matching
          </span>
          <span className="rounded-full border border-[#cde0d9] bg-[#eff7f5] px-3 py-1">
            No rigid categories
          </span>
          <span className="rounded-full border border-[#cde0d9] bg-[#eff7f5] px-3 py-1">
            Built for solo-builders
          </span>
        </div>
      </div>

      <WaitlistCard
        className={`transition-all duration-700 ${reveal.visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      />
    </section>
  );
}
