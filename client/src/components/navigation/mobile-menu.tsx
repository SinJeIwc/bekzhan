import { Button } from "@components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@components/ui/sheet";
import { navigation } from "@constants/navigation";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<MenuIcon className="w-6 h-6" />
					<span className="sr-only">Open menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle></SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<nav className="grid flex-1 gap-6 auto-rows-min">
					{navigation.map((item) => (
						<SheetClose asChild key={item.title}>
							<Link
								href={item.url}
								className="flex items-center gap-2 px-4 text-lg font-medium hover:underline"
							>
								<item.icon className="w-5 h-5" />
								{item.title}
							</Link>
						</SheetClose>
					))}
				</nav>
				<SheetFooter>
					<SheetClose asChild>
						<Button variant="secondary" className="w-full">
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
