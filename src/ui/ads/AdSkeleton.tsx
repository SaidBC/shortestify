import clsx from "clsx";

export default function AdSkeleton({ classname }: { classname?: string }) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center bg-slate-500",
        classname
      )}
    >
      <span className="text-2xl font-bold text-slate-400">ADS</span>
    </div>
  );
}
