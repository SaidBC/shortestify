import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

interface IconicLinkItemProps {
  to: string;
  icon: IconProp;
  children: React.ReactNode;
  active?: boolean;
}

export default function IconicLinkItem({
  icon,
  children,
  to,
  active = false,
}: IconicLinkItemProps) {
  return (
    <li className="w-full">
      <Link
        href={to}
        className={clsx(
          "flex font-bold items-center gap-2 pl-10 w-full text-center py-3 rounded-md hover:bg-white/5",
          active &&
            "bg-white/5 shadow-[inset_2px_0_10px_rgba(255,255,255,0.10),1px_3px_20px_#00000033] border-1 border-white/25"
        )}
      >
        <FontAwesomeIcon icon={icon} />
        {children}
      </Link>
    </li>
  );
}
