import { useReveal } from "../../hooks/useReveal";
import { techStackCards } from "./content";

export function NicheSection() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id="niche"
      ref={reveal.ref}
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20"
    >
      <div
        className={`rounded-3xl border border-[#cfc7b8] bg-linear-to-br from-[#17322e] to-[#1f4a43] p-7 text-white shadow-xl shadow-[#17322e]/20 transition-all duration-700 md:p-10 ${reveal.visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <p className="text-xs font-bold tracking-widest text-[#9bd7cd]">
          WHO IS THIS FOR?
        </p>
        <h2 className="mt-3 max-w-3xl font-['Space_Grotesk'] text-3xl font-bold leading-tight sm:text-4xl">
          Built for Solo-Builders, Founders, and Niche Thinkers
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#c2ddd8] sm:text-base">
          Building in a vacuum is difficult and lonely. You're actively looking
          for intellectual peers who have the same risk tolerance, specific
          technical interests, and market obsessions. This is your network—no
          small talk, just depth from day one.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#join"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1a3e38] transition hover:-translate-y-0.5"
          >
            Join Waitlist
          </a>
          <a
            href="#bridge"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            See How We Connect You
          </a>
        </div>
      </div>
    </section>
  );
}

export function TechStackSection() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id="tech"
      ref={reveal.ref}
      className="border-y border-[#d9d2c4] bg-[#f2eee4]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-[#0b7567]">
            OFF-THE-SHELF INFRASTRUCTURE
          </p>
          <h2 className="mt-3 max-w-3xl font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
            Production-ready tools make this highly feasible
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {techStackCards.map((item, index) => (
            <article
              key={item.component}
              className={`rounded-2xl border border-[#d7cfbf] bg-[#fffaf1] p-5 transition-all duration-700 ${reveal.visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0b7567]">
                {item.component}
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold">
                {item.tool}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5b6866]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
