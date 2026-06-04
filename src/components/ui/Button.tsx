import clsx from "clsx";

export function Button({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "inline-flex items-center px-3 py-1.5 rounded text-sm font-medium",
        "bg-accent text-bg hover:opacity-90 disabled:opacity-50",
        className
      )}
      {...rest}
    />
  );
}
