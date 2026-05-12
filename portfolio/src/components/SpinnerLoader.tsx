type ColorScheme =
  | "primary"
  | "neutral"
  | "success"
  | "destructive"
  | "warning"
  | "white";

type SpinnerLoaderProps = {
  customSize?: number;
  colorScheme?: ColorScheme;
};

const COLOR_CLASSES: Record<ColorScheme, string> = {
  primary: "text-primarylight-900 dark:text-primarydark-900",
  neutral: "text-neutrallight-900 dark:text-neutraldark-900",
  success: "text-success-900",
  destructive: "text-destructive-900",
  warning: "text-warning-900",
  white: "text-white",
};

export function SpinnerLoader({
  customSize = 16,
  colorScheme = "neutral",
}: SpinnerLoaderProps) {
  return (
    <svg
      className={`animate-spin ${COLOR_CLASSES[colorScheme]}`}
      style={{ width: customSize, height: customSize }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
