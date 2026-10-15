/** Fixed ambient background: soft drifting blue orbs + a fading dot grid. */
export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden>
      <span className="absolute -top-45 -left-40 size-140 animate-drift rounded-full bg-blue-300 opacity-50 blur-[90px]" />
      <span className="absolute top-[18%] -right-45 size-120 animate-drift rounded-full bg-indigo-200 opacity-50 blur-[90px] [animation-delay:-8s]" />
      <span className="absolute -bottom-65 left-[28%] size-155 animate-drift rounded-full bg-sky-200 opacity-45 blur-[90px] [animation-delay:-16s]" />
      <span className="absolute inset-0 bg-[radial-gradient(rgb(15_23_42/0.07)_1px,transparent_1px)] mask-[linear-gradient(180deg,#000,transparent_55%)] bg-size-[22px_22px]" />
    </div>
  );
}
