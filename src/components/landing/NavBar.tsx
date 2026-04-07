type NavLink = {
  label: string;
  href: string;
};

type NavBarProps = {
  navLinks: NavLink[];
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export function NavBar({ navLinks, menuOpen, setMenuOpen }: NavBarProps) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#d9d2c4]/80 bg-[#f6f2e9]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-[#0f8f7b] to-[#16b49d] text-sm font-bold text-white shadow-lg shadow-[#0f8f7b]/25">
              TC
            </span>
            <div>
              <p className="font-['Space_Grotesk'] text-sm font-bold tracking-widest">
                TRUECONVOS
              </p>
              <p className="text-xs text-[#5c6967]">
                Consumer social intelligence
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#324140] md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-[#0f8f7b]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#join"
              className="rounded-full bg-[#182725] px-4 py-2 text-white transition hover:bg-[#203431]"
            >
              Join Waitlist
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg border border-[#cfc8bb] px-3 py-2 text-sm font-semibold md:hidden"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/30 transition md:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`ml-auto flex h-full w-72 flex-col gap-4 bg-[#fffaf1] p-5 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="font-['Space_Grotesk'] text-sm font-bold tracking-widest">
              TRUECONVOS
            </p>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-md border border-[#d6cebf] px-2 py-1 text-xs"
            >
              Close
            </button>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border border-[#ddd4c4] bg-white px-4 py-3 text-sm font-semibold text-[#2b3b39]"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#join"
            onClick={() => setMenuOpen(false)}
            className="mt-auto rounded-xl bg-[#182725] px-4 py-3 text-center text-sm font-bold text-white"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </>
  );
}
