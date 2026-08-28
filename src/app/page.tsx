import Link from "next/link";

/** Render the short public entry point for starting a payment trace. */
export default function HomePage() {
  return (
    <section
      aria-labelledby="home-heading"
      className="home-entry mx-auto flex w-full max-w-5xl flex-1 items-center px-5 py-10 sm:px-8 sm:py-14"
    >
      <div className="max-w-3xl">
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
          Payment missing?
        </p>
        <h1
          className="mt-3 text-4xl font-black leading-[1.06] tracking-[-0.04em] text-ink sm:text-6xl"
          id="home-heading"
        >
          Your government payment says &lsquo;Processed&rsquo;. So where is it?
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink sm:text-xl sm:leading-9">
          We trace the payment through the scheme office, treasury, Aadhaar
          payment system, NPCI mapper, and bank. Then we tell you what broke and
          the exact thing to do next.
        </p>

        <Link
          className="mt-8 inline-flex min-h-14 w-full items-center justify-center bg-primary px-6 py-3 text-center text-lg font-black text-paper hover:bg-ink sm:w-auto"
          href="/trace"
        >
          Find my missing payment
        </Link>
        <p className="mt-4 text-base font-semibold text-muted">
          Helping someone else? This works for that too.
        </p>

        <nav aria-label="More information" className="mt-7 flex gap-6 border-t border-line pt-4">
          <Link
            className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
            href="/sources"
          >
            Sources
          </Link>
        </nav>
      </div>
    </section>
  );
}
