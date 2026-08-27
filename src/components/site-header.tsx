const DEMO_NOTICE =
  "Demo only — all data is synthetic. This is not a government service.";

/** Render the persistent product identity and synthetic-data warning. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/20">
      <div className="bg-primary text-paper">
        <div className="mx-auto flex min-h-14 w-full max-w-5xl items-center px-5 sm:px-8">
          <span className="text-lg font-extrabold tracking-[-0.015em]">
            Paisa Kahan Hai
          </span>
        </div>
      </div>
      <p className="m-0 bg-accent px-5 py-2.5 text-center text-base font-bold leading-6 text-ink sm:px-8">
        {DEMO_NOTICE}
      </p>
    </header>
  );
}
