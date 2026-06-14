type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#003324] to-[#006144] px-4 pb-24 pt-44 text-center text-white sm:px-6 lg:px-8">
      <div className="hmi-pattern pointer-events-none absolute inset-0 opacity-35" />
      <div className="relative mx-auto max-w-7xl">
        {eyebrow ? (
          <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#F2994A]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/78">
          {description}
        </p>
      </div>
    </section>
  );
}
