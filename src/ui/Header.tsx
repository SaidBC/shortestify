"use client";

import Logo from "@/components/Logo";
import HeaderLinksList from "./HeaderLinksList";
import BurgerIcon from "@/components/BugerIcon";
import XmarkIcon from "@/components/XmarkIcon";
import HeaderLinksListMobile from "./HeaderLinksListMobile";
import { useCallback, useState } from "react";
import clsx from "clsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClose = useCallback(() => setIsMenuOpen(false), []);
  const handleOpen = useCallback(() => setIsMenuOpen(true), []);
  return (
    <header className="fixed z-1000 flex justify-between items-center w-full text-white h-18 px-4 md:px-8 bg-indigo-500">
      <Logo />
      <nav className="">
        <div className="hidden md:block">
          <HeaderLinksList />
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={handleOpen} className="cursor-pointer">
            <BurgerIcon />
          </button>
        </div>
        <div
          className={clsx(
            "fixed md:hidden top-0 left-0 w-full bg-indigo-900 h-dvh z-50 p-6 animate-toLeft",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="flex justify-between">
            <Logo />
            <button onClick={handleClose} className=" cursor-pointer">
              <XmarkIcon />
            </button>
          </div>
          <div className="mt-20 w-full flex justify-center">
            <HeaderLinksListMobile />
          </div>
        </div>
      </nav>
    </header>
  );
}
