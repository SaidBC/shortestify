"use client";

import Logo from "@/components/Logo";
import {
  faDatabase,
  faGear,
  faHome,
  faMessage,
  faPlus,
  faRightFromBracket,
  faUpload,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import IconicLinkItem from "@/components/IconicLinkItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import LogoutForm from "./LogoutForm";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return (
    <nav
      className={clsx(
        "sticky top-0 transition-[margin] flex w-70 h-dvh bg-slate-950 text-white py-6 px-2 z-9999",
        !isOpen && "-ml-70"
      )}
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
        <button
          onClick={handleToggle}
          className="w-12 h-20 rounded-r-3xl bg-slate-950 "
        >
          <div
            className={clsx(
              "relative",
              isOpen ? "-left-3 -top-0.5" : "-left-1.5 -top-0.5"
            )}
          >
            <span
              className={clsx(
                "absolute w-4 h-1 rounded-full bg-white",
                isOpen ? "rotate-45 w-6" : "rotate-45 -translate-y-1.25"
              )}
            ></span>
            <span
              className={clsx(
                "absolute w-4 h-1 rounded-full bg-white",
                isOpen ? "-rotate-45 w-6" : "-rotate-45 translate-y-1.25"
              )}
            ></span>
          </div>
        </button>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="self-center">
          <Logo />
        </div>
        <ul className="flex flex-col w-full gap-2 ">
          <IconicLinkItem
            active={pathname === "/me/dashboard"}
            icon={faHome}
            to="/me/dashboard"
          >
            <span>Dashboard</span>
          </IconicLinkItem>
          <IconicLinkItem
            active={pathname === "/me/create"}
            icon={faPlus}
            to="/me/create"
          >
            <span>Create link</span>
          </IconicLinkItem>
          <IconicLinkItem
            active={pathname === "/me/upload"}
            icon={faUpload}
            to="/me/upload"
          >
            <span>Upload file</span>
          </IconicLinkItem>
          <IconicLinkItem
            active={pathname === "/me/links"}
            icon={faDatabase}
            to="/me/links"
          >
            <span>Links / Uploads</span>
          </IconicLinkItem>
          <IconicLinkItem
            active={pathname === "/me/withdraw"}
            icon={faWallet}
            to="/me/withdraw"
          >
            <span>Withdraw</span>
          </IconicLinkItem>
          <IconicLinkItem
            active={pathname === "/me/settings"}
            icon={faGear}
            to="/me/settings"
          >
            <span>Settings</span>
          </IconicLinkItem>
          <IconicLinkItem
            active={pathname === "/contactus"}
            icon={faMessage}
            to="/contactus"
          >
            <span>Contact us</span>
          </IconicLinkItem>
        </ul>
        <div>
          <LogoutForm />
        </div>
      </div>
    </nav>
  );
}
