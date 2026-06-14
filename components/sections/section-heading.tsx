type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#006144]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="relative inline-block pb-4 text-3xl font-black tracking-tight text-[#003324] sm:text-4xl">
        {title}
        <span
          className={`absolute bottom-0 h-1.5 w-20 rounded-full bg-[#F2994A] ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
          }`}
        />
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-[#4B6259] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
