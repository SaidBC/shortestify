import Image from "next/image";

interface RatesItemProps {
  countryName: string;
  countrySrcImage: string;
  countryShortLinkRate: number;
  countryDownloadRate: number;
}
export default function RatesItem({
  countryName,
  countrySrcImage,
  countryShortLinkRate,
  countryDownloadRate,
}: RatesItemProps) {
  return (
    <li className="bg-white rounded-lg px-8 py-4 flex flex-col gap-4 text-slate-700 max-w-md w-full mx-auto border shadow-lg">
      <div className="flex items-center gap-4">
        <Image
          src={countrySrcImage}
          alt={countryName + "'s Flag"}
          width={124}
          height={124}
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">{countryName}</h2>
          <span>1000 views / -</span>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-4">
          <Image src="/linkicon.png" width={48} height={48} alt="eye icon" />
          <div className="flex flex-col">
            <span className="font-bold text-2xl">${countryShortLinkRate}</span>
            <span className="text-sm">every devices</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image
            src="/uploadicon.png"
            width={48}
            height={43}
            alt="upload icon"
          />
          <div className="flex flex-col">
            <span className="font-bold text-2xl">${countryDownloadRate}</span>
            <span className="text-sm">every devices</span>
          </div>
        </div>
      </div>
    </li>
  );
}
