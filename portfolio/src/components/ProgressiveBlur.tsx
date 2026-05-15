type ProgressiveBlurProps = {
  position: "top" | "bottom";
  height: number;
  className?: string;
};

// Each layer: a blur strength + a [solidUntil%, fadeOutBy%] mask.
// Heaviest blur is at the edge (top for "top", bottom for "bottom").
// Masks heavily overlap so transitions between layers blend smoothly.
const LAYERS = [
  { blur: 0.5, mask: [60, 100] },
  { blur: 1, mask: [50, 90] },
  { blur: 2, mask: [40, 80] },
  { blur: 4, mask: [30, 70] },
  { blur: 8, mask: [20, 60] },
  { blur: 16, mask: [12, 48] },
  { blur: 32, mask: [6, 32] },
  { blur: 64, mask: [0, 18] },
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
