import { DramaList } from "@/components/drama/drama-list";

export const metadata = {
  title: "Dramas | Bekzhan",
  description: "My drama watchlist",
};

export default function DramasPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="font-bold text-3xl md:text-4xl">Dramas</h1>
      <p className="mt-2 text-muted-foreground">
        My personal drama watchlist and reviews.
      </p>
      <DramaList />
    </div>
  );
}
