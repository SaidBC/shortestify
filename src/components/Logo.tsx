import Image from "next/image";

export default function Logo() {
  return (
    <Image
      width={200}
      height={50}
      alt="logo"
      className="w-36 sm:w-48"
      src={"/logo-white-transparent.png"}
    />
  );
}
