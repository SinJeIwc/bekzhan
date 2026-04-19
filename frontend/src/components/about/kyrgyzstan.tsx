import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import Image from "next/image";

export function Kyrgyzstan() {
  return (
    <Popover>
      <PopoverTrigger className="relative text-chart-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-chart-2 after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:after:scale-x-100 hover:after:opacity-100 focus:outline-0 focus-visible:after:scale-x-100 focus-visible:after:opacity-100">
        Kyrgyzstan
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" side="top">
        <Image
          src="/kg.jpg"
          alt="Kyrgyzstan"
          width={200}
          height={200}
          className="rounded-2xl"
        />
      </PopoverContent>
    </Popover>
  );
}
