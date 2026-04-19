"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { LogOut } from "@/components/animate-ui/icons/log-out";
import { Menu } from "@/components/animate-ui/icons/menu";
import { Button } from "@/components/ui/button";
import { navigation } from "@/constants/navigation";
import { useAuth } from "@/lib/auth";

function MenuDropdown({
	isOwner,
	onClose,
	onLogout,
}: {
	isOwner: boolean;
	onClose: () => void;
	onLogout: () => void;
}) {
	return createPortal(
		<>
			<div
				className="fixed inset-0 z-50"
				onPointerDown={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onClose();
				}}
				aria-hidden="true"
			/>

			<motion.nav
				className="fixed top-23 right-2 left-2 z-50 flex origin-top flex-col gap-1 rounded-lg border border-chart-2/10 bg-background/95 p-2 shadow-lg backdrop-blur-md"
				initial={{ opacity: 0, scaleY: 0 }}
				animate={{ opacity: 1, scaleY: 1 }}
				exit={{ opacity: 0, scaleY: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				{navigation.map((item) => (
					<Link
						key={item.url}
						href={item.url}
						onClick={onClose}
						className="flex items-center gap-3 rounded-md px-4 py-3 font-medium text-sm transition-colors hover:bg-chart-2/10 focus:outline-none focus:ring-1 focus:ring-chart-2"
					>
						<item.icon className="h-4 w-4" />
						{item.title}
					</Link>
				))}

				{isOwner && (
					<>
						<div className="my-1 h-px bg-border" />
						<Button
							variant="ghost"
							onClick={onLogout}
							className="justify-start gap-3 rounded-md px-4 py-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
						>
							<AnimateIcon animateOnHover asChild>
								<span className="inline-flex">
									<LogOut size={16} />
								</span>
							</AnimateIcon>
							Logout
						</Button>
					</>
				)}
			</motion.nav>
		</>,
		document.body,
	);
}

export function MobileMenu() {
	const { isOwner, logout } = useAuth();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [open]);

	const handleClose = () => setOpen(false);

	return (
		<>
			<AnimateIcon animate={open} asChild>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setOpen((v) => !v)}
					className="aria-expanded:bg-transparent"
					aria-expanded={open}
					aria-label={open ? "Close menu" : "Open menu"}
				>
					<Menu size={20} />
				</Button>
			</AnimateIcon>

			<AnimatePresence>
				{open && (
					<MenuDropdown
						isOwner={isOwner}
						onClose={handleClose}
						onLogout={() => {
							logout();
							setOpen(false);
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
