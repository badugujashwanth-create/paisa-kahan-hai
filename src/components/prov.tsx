const PROVENANCE_DETAILS = {
  mock: {
    label: "MOCK",
    chipClassName: "border-ink bg-accent text-ink",
  },
  modelled: {
    label: "MODELLED",
    chipClassName: "border-modelled bg-modelled-soft text-modelled",
  },
  cited: {
    label: "CITED",
    chipClassName: "border-success bg-success-soft text-success",
  },
  verified: {
    label: "VERIFIED",
    chipClassName: "border-primary bg-primary text-paper",
  },
} as const;

export type ProvKind = keyof typeof PROVENANCE_DETAILS;

export type ProvProps = Readonly<{
  kind: ProvKind;
  source?: string;
}>;

/** Render a prominent provenance label with an optional source. */
export function Prov({ kind, source }: ProvProps) {
  const provenance = PROVENANCE_DETAILS[kind];

  if (!provenance) {
    throw new Error(`Unsupported provenance kind: ${String(kind)}`);
  }

  const normalizedSource = source?.trim();

  return (
    <span className="inline-flex min-h-7 items-center gap-2">
      <span
        className={`inline-flex rounded-full border-2 px-2 py-0.5 text-xs font-black tracking-wider ${provenance.chipClassName}`}
      >
        {provenance.label}
      </span>
      {normalizedSource ? (
        <span className="text-sm font-medium text-muted">{normalizedSource}</span>
      ) : null}
    </span>
  );
}
