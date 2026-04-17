import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

export function Kyrgyzstan() {
	return (
		<Popover>
			<PopoverTrigger className="underline text-chart-2">
				Kyrgyzstan
			</PopoverTrigger>
			<PopoverContent className="p-0" side="top">
				<Image src="/kg.jpg" alt="Kyrgyzstan" width={200} height={200} />
			</PopoverContent>
		</Popover>
	);
}
