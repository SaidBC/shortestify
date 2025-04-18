import clsx from "clsx";
export default function TextError({
  children,
  className,
  ...props
}: React.JSX.IntrinsicElements["p"]) {
  return (
    <p className={clsx("text-sm font-bold text-red-500", className)}>
      {children}
    </p>
  );
}
