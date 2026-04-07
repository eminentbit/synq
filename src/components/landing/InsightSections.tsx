import { useReveal } from "../../hooks/useReveal";
import { coldStartCards, engagementCards, thesisCards } from "./content";

function ThreeCardSection({
  id,
  eyebrow,
  title,
  cards,
  muted = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  cards: { title: string; body: string }[];
  muted?: boolean;
}) {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={reveal.ref}
      className={muted ? "border-y border-[#d9d2c4] bg-[#f2eee4]" : ""}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-[#0b7567]">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-2xl border border-[#d7cfbf] bg-[#fffaf1] p-5 transition-all duration-700 ${reveal.visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <h3 className="font-['Space_Grotesk'] text-xl font-bold">
                {item.title}
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

export function ThesisSection() {
  return (
    <ThreeCardSection
      id="how"
      eyebrow="HOW IT WORKS"
      title="Semantic vectors turn your words into mathematical precision"
      cards={thesisCards}
    />
  );
}

export function EngagementSection() {
  return (
    <ThreeCardSection
      id="bridge"
      eyebrow="BREAKING THE SMALL TALK BARRIER"
      title="Every conversation starts with context, not awkward hellos"
      cards={engagementCards}
      muted
    />
  );
}

export function ColdStartSection() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      id="coldstart"
      ref={reveal.ref}
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20"
    >
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-[#0b7567]">
          COLD START DEFENSE
        </p>
        <h2 className="mt-3 max-w-3xl font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
          Day-one value even before density fully builds
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {coldStartCards.map((item, index) => (
          <article
            key={item.title}
            className={`rounded-2xl border border-[#d7cfbf] bg-[#fffaf1] p-5 transition-all duration-700 ${reveal.visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0f8f7b] text-sm font-bold text-white">
              {item.label}
            </span>
            <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-bold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#5b6866]">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
