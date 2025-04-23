import initializeClick from "@/lib/initializeClick";
import OutputCard from "./OutputCard";

export default async function OutputContainer({
  shortSlug,
}: {
  shortSlug: string;
}) {
  const clickStart = await initializeClick(shortSlug);
  if (!clickStart.success) return <>Something went wrong</>;
  return (
    <div>
      <OutputCard clickId={clickStart.data.id} />
    </div>
  );
}
