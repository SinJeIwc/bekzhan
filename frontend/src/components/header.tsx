import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { DesktopMenu } from "./navigation/desktop-menu";
import { MobileMenu } from "./navigation/mobile-menu";
import { ThemeButton } from "./theme-button";

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 z-50 flex h-18 w-[calc(100%-1rem)] -translate-x-1/2 items-center justify-between rounded-lg border border-chart-2/10 bg-background/80 p-2 backdrop-blur-md md:container sm:w-[calc(100%-2rem)] md:p-4">
      <Link
        href="/"
        className="relative inline-flex font-medium text-base after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-chart-2 after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:after:scale-x-100 hover:after:opacity-100 focus:outline-none focus-visible:after:scale-x-100 focus-visible:after:opacity-100 md:text-xl"
      >
        <h1 className="font-bold">
          <span className="text-chart-2">Arstanaliev</span> Bekzhan
        </h1>
      </Link>

      <div className="hidden md:block">
        <DesktopMenu />
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <LogoutButton />
        </div>
        <ThemeButton />
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
