import RatesItem from "./RatesItem";
const ratesData = [
  {
    countryName: "United States",
    countrySrcImage: "/us.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "United Kingdom",
    countrySrcImage: "/gb.png",
    countryShortLinkRate: 10,
    countryDownloadRate: 6,
  },
  {
    countryName: "Netherlands",
    countrySrcImage: "/nl.png",
    countryShortLinkRate: 9.5,
    countryDownloadRate: 5,
  },
  {
    countryName: "Germany",
    countrySrcImage: "/de.png",
    countryShortLinkRate: 9,
    countryDownloadRate: 5,
  },
  {
    countryName: "United Arab Emirates",
    countrySrcImage: "/ae.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "Canada",
    countrySrcImage: "/ca.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "India",
    countrySrcImage: "/in.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "Indonesia",
    countrySrcImage: "/id.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "Bangladesh",
    countrySrcImage: "/bd.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "Pakistan",
    countrySrcImage: "/pk.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "Russia",
    countrySrcImage: "/ru.png",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
  {
    countryName: "Other world",
    countrySrcImage: "/all.svg",
    countryShortLinkRate: 12,
    countryDownloadRate: 8,
  },
];

export default function RatesList() {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 my-12">
      {ratesData.map((data) => {
        return <RatesItem key={data.countryName} {...data} />;
      })}
    </ul>
  );
}
