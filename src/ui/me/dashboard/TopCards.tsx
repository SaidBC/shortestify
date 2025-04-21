import BalanceCard from "./BalanceCard";
import DailyDownloadsCard from "./DailyDownloadsCard";
import DailyRedirectsCard from "./DailyRedirectsCard";

export default function TopCards() {
  return (
    <div className="grid grid-cols-1  @[40rem]:grid-cols-2 @[64rem]:grid-cols-3 gap-4">
      <BalanceCard />
      <DailyRedirectsCard />
      <DailyDownloadsCard />
    </div>
  );
}
