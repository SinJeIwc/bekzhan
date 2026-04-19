"use client";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { LogOut } from "@/components/animate-ui/icons/log-out";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/constants/navigation";
import { Menu } from "@/components/animate-ui/icons/menu";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

export function MobileMenu() {
	const { isOwner, logout } = useAuth();

	return (
		<Sheet>
			<AnimateIcon animateOnHover asChild>
				<SheetTrigger render={<Button variant="ghost" size="icon" />}>
					<Menu size={20} />
					<span className="sr-only">Open menu</span>
				</SheetTrigger>
			</AnimateIcon>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="flex gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
						>
							<title>Logo</title>
							<path
								fill="currentColor"
								d="M2 2h20v5h-2.915l.385 3H22v2h-2.274l1.393 10.865l-1.984.254L17.71 12H6.258l-1.39 11.116l-1.984-.248L4.242 12H2v-2h2.492l.375-3H2zm4.883 5l-.375 3H11V7zM13 7v3h4.454l-.385-3z"
							/>
						</svg>
						<span>Avenue</span>
					</SheetTitle>
					<SheetDescription>Continue the route</SheetDescription>
				</SheetHeader>
				<nav className="flex flex-col">
					{navigation.map((item) => (
						<SheetClose
							nativeButton={false}
							key={item.title}
							render={
								<Link
									href={item.url}
									className="flex items-center gap-2 rounded-md px-4 py-6 font-medium text-lg hover:bg-chart-2/10 focus:outline-none focus:ring-1 focus:ring-chart-2"
								/>
							}
						>
							<item.icon className="h-5 w-5" />
							{item.title}
						</SheetClose>
					))}

					{isOwner && (
						<SheetClose
							nativeButton={false}
							render={
								<button
									type="button"
									onClick={logout}
									className="flex items-center gap-2 rounded-md px-4 py-6 font-medium text-lg text-destructive hover:bg-destructive/10 focus:outline-none focus:ring-1 focus:ring-destructive"
								/>
							}
						>
							<AnimateIcon animateOnHover asChild>
								<span className="inline-flex">
									<LogOut size={20} />
								</span>
							</AnimateIcon>
							Logout
						</SheetClose>
					)}
				</nav>
				<SheetFooter>
					<p className="text-muted-foreground text-xs">
						Something might appear here someday, probably...
					</p>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
