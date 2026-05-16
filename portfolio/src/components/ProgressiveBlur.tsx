type ProgressiveBlurProps = {
  position: "top" | "bottom";
  height: number;
  className?: string;
};

// Each layer: a blur strength + a [solidUntil%, fadeOutBy%] mask.
// Heaviest blur is at the edge (top for "top", bottom for "bottom").
// Fewer layers + page bg fade overlay = smooth result with better perf.
const LAYERS = [
  { blur: 1, mask: [50, 100] },
  { blur: 4, mask: [30, 75] },
  { blur: 12, mask: [15, 50] },
  { blur: 32, mask: [0, 25] },
];

export function ProgressiveBlur({
  position,
  height,
  className = "",
}: ProgressiveBlurProps) {
  return (
    <div
      className={`pointer-events-none fixed left-0 right-0 z-30 ${
        position === "top" ? "top-0" : "bottom-0"
      } ${className}`}
      style={{ height }}
    >
      {LAYERS.map((layer, i) => {
        // Build a vertical linear gradient: solid black until `solidEnd%`,
        // then smooth fade to transparent by `fadeEnd%`.
        const [solidEnd, fadeEnd] = layer.mask;
        const direction = position === "top" ? "to bottom" : "to top";
        const mask = `linear-gradient(${direction}, black 0%, black ${solidEnd}%, transparent ${fadeEnd}%)`;

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
