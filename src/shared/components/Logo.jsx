/**
 * Cuspian Studio's brand mark (the orange "C" / white "S" icon), rendered
 * from the real logo asset in `public/brand/` instead of a placeholder
 * glyph. `className` sizes the wrapper; the image itself fills it via
 * `object-contain` so it never stretches out of its original aspect ratio.
 */
export function Logo({ className = "h-9 w-9" }) {
  return (
    <img
      src="/brand/logo-mark.png"
      alt="Cuspian Studio"
      className={`${className} object-contain`}
    />
  );
}
