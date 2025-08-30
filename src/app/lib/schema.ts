export type Post = {
  id: string;
  title: string;
  status: "published" | "draft";
  author: string;
  createdAt: string; // For simplicity, we use string
};