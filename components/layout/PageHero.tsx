export default function PageHero({
  eyebrow,
  title,
  subtitle,
  accentColor = "#E8A33D",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
}) {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {eyebrow && (
          <span
            className="font-mono-tag text-xs font-semibold tracking-widest uppercase"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-3xl lg:text-5xl font-bold mt-3 max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/65 mt-4 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
