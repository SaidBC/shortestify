import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface SettingsOptionLinkProps {
  icon: IconProp;
  title: string;
  description: string;
  to: string;
}

export default function SettingsOptionLink({
  icon,
  title,
  description,
  to,
}: SettingsOptionLinkProps) {
  return (
    <Link
      href={to}
      className="flex justify-between px-4 py-2 border-1  border-slate-200 rounded-xl items-center"
    >
      <div className="flex items-center gap-4">
        <FontAwesomeIcon className="text-xl" icon={icon} />
        <div className="flex flex-col text-start">
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-sm text-slate-400">{description}</span>
        </div>
      </div>
      <FontAwesomeIcon icon={faGear} />
    </Link>
  );
}
