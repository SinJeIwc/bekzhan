import { Header } from "@/components/header";
import { StatusButton } from "@/components/status-button";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<StatusButton />
		</>
	);
}
