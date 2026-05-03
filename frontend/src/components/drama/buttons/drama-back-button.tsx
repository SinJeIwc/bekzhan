import { Button } from "@components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "@/components/animate-ui/icons/chevron-left";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

interface DramaBackButtonProps {
  href?: string;
  label?: string;
}

export function DramaBackButton({
  href = "/d",
  label = "Back",
}: DramaBackButtonProps) {
  return (
    <AnimateIcon animateOnHover>
      <Button
        variant="ghost"
        className="mb-6"
        nativeButton={false}
        render={<Link href={href} />}
      >
        <ChevronLeft />
        {label}
      </Button>
    </AnimateIcon>
  );
}
