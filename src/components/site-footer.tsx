import Link from "next/link";

const GITHUB_REPOSITORY_URL =
  "https://github.com/badugujashwanth-create/paisa-kahan-hai";

/** Render quiet project and disclosure links at the end of every page. */
export function SiteFooter() {
  return (
    <footer className="print-hidden border-t border-line px-5 sm:px-8">
      <nav
        aria-label="Project information"
        className="mx-auto flex min-h-20 w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-1 text-sm font-bold text-muted"
      >
        <Link className="inline-flex min-h-tap items-center hover:text-primary hover:underline" href="/about">
          About
        </Link>
        <Link className="inline-flex min-h-tap items-center hover:text-primary hover:underline" href="/sources">
          Sources
        </Link>
        <Link className="inline-flex min-h-tap items-center hover:text-primary hover:underline" href="/check-yourself">
          Check yourself
        </Link>
        <a className="inline-flex min-h-tap items-center hover:text-primary hover:underline" href={GITHUB_REPOSITORY_URL}>
          GitHub repository
        </a>
      </nav>
    </footer>
  );
}
