/**
 * PrimaryButton — reusable branded button
 *
 * Props:
 *   children   – button label / content
 *   onClick    – click handler (optional)
 *   type       – "button" | "submit" | "reset"  (default: "button")
 *   className  – extra Tailwind classes to merge in (optional)
 *   disabled   – disables the button (optional)
 *   fullWidth  – stretches to full container width (optional, default false)
 *   size       – "sm" | "md" | "lg"  (default: "md")
 *   variant    – "filled" | "outline" | "ghost"  (default: "filled")
 */
export default function PrimaryButton({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  fullWidth = false,
  size = 'md',
  variant = 'filled',
}) {
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variants = {
    filled: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'rounded-full font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm bg-[#1B2D5D]',
        sizes[size],
        variants[variant],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}
