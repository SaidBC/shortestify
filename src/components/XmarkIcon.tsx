export default function XmarkIcon() {
  return (
    <div className="relative [&>*]:absolute [&>*]:top-1/2 [&>*]:-translate-y-1/2 [&>*]:bg-white [&>*]:w-full [&>*]:h-1.25 [&>*]:rounded-full flex flex-col justify-between w-9 h-7 ">
      <div className="rotate-45"></div>
      <div className="-rotate-45"></div>
    </div>
  );
}
