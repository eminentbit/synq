type ParallaxAccentsProps = {
  scrollY: number;
};

export function ParallaxAccents({ scrollY }: ParallaxAccentsProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#0f8f7b]/20 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-120 h-72 w-72 rounded-full bg-[#1038a8]/15 blur-3xl"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      />
    </>
  );
}
