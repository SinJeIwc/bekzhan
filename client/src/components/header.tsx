import Link from "next/link";
import { ThemeButton } from "./theme-button";
import { MobileMenu } from "./navigation/mobile-menu";
import { DesktopMenu } from "./navigation/desktop-menu";

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:container p-2 md:p-4 h-18 shadow- bg-background/80 backdrop-blur-md border border-chart-2/10 rounded-lg">
      <Link href="/" className="flex text-base font-medium md:text-xl focus:outline-none focus:border-b focus:border-b-chart-2">
        <h1 className="font-bold"><span className="text-chart-2">Arstanaliev</span> Bekzhan</h1>
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