import { Prov } from "@/components/prov";

/** Render the intentionally minimal scaffold home page. */
export default function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-12 sm:px-8">
      <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
        Paisa Kahan Hai
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink sm:text-xl sm:leading-9">
        Find out why your government payment never arrived — and exactly what
        to do about it.
      </p>
      <button
        className="mt-8 min-h-tap w-full max-w-48 cursor-not-allowed rounded-md border-2 border-line bg-line px-6 py-3 text-base font-bold text-muted opacity-80"
        disabled
        type="button"
      >
        Start
      </button>
      <div
        aria-label="Provenance examples"
        className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6"
      >
        <Prov kind="mock" />
        <Prov kind="modelled" />
        <Prov kind="cited" />
        <Prov kind="verified" />
      </div>
    </section>
  );
}
