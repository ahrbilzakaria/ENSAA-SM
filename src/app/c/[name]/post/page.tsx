import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    name: string;
  };
}

const page = async ({ params }: pageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.name,
    },
  });
  if (!subreddit) {
    return notFound();
  }
  return <div>Create post page for c/{params.name}</div>;
};

export default page;
