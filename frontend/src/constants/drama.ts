export const STATUS_COLORS: Record<string, string> = {
  watching: "bg-chart-2/20 text-chart-2",
  completed: "bg-green-500/20 text-green-600 dark:text-green-400",
  dropped: "bg-destructive/20 text-destructive",
  planned: "bg-muted text-muted-foreground",
};

export const STATUSES = [
  "watching",
  "completed",
  "dropped",
  "planned",
] as const;

export const COUNTRIES = ["Korea", "China", "Japan", "Taiwan"] as const;

export const GENRES = [
  "Romance",
  "Comedy",
  "Drama",
  "Action",
  "Thriller",
  "Mystery",
  "Fantasy",
  "Historical",
  "Xianxia",
  "Melodrama",
  "School",
  "Office",
  "Sports",
  "Medical",
  "Legal",
  "Crime",
  "Reality show",
  "Supernatural",
  "Military",
  "Time travel",
  "Reincarnation",
] as const;
