import Link from "next/link";
import { DesktopMenu } from "./navigation/desktop-menu";
import { MobileMenu } from "./navigation/mobile-menu";
import { ThemeButton } from "./theme-button";

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:container p-2 md:p-4 h-18 bg-background/80 backdrop-blur-md border border-chart-2/10 rounded-lg">
      <Link
        href="/"
        className="relative inline-flex text-base font-medium md:text-xl focus:outline-none after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:opacity-0 after:bg-chart-2 after:transition-all after:duration-300 after:ease-out hover:after:scale-x-100 hover:after:opacity-100 focus-visible:after:scale-x-100 focus-visible:after:opacity-100"
      >
        <h1 className="font-bold">
          <span className="text-chart-2">Arstanaliev</span> Bekzhan
        </h1>
      </Link>

      <div className="hidden md:block">
        <DesktopMenu />
      </div>

      <div className="flex items-center gap-2">
        <ThemeButton />
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
