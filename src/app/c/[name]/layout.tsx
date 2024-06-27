import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { IncomingMessage } from "http";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Button from "@/components/ui/button";
import SubscriptionBtn from "@/components/SubscriptionBtn";

export default async function Layout({
  children,
  params: { name },
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const session = await getSession();
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: name,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });
  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: name,
          },
          user: {
            id: session.user.id,
          },
        },
      });
  const isSubscribed = !!subscription;
  if (!subreddit) {
    return notFound();
  }
  const numMembers = await db.subscription.count({
    where: {
      subreddit: {
        name: name,
      },
    },
  });

  const creatorName = !subreddit.creatorId
    ? null
    : await db.user.findFirst({
        where: {
          id: subreddit.creatorId,
        },
        select: {
          name: true,
        },
      });

  return (
    <div className="grid grid-cols-3 gap-2 ">
      {/* Take us back button */}
      <div className="md:col-span-2 col-span-3">{children}</div>

      <div className="md:col-span-1 hidden w-full border md:flex flex-col justify-center items-start gap-2 p-4 sm:p-3 rounded-md ">
        <h2 className="font-semibold">Community Details:</h2>
        <dl className="divide-y divide-gray-100 w-full bg-white ">
          <div className="flex justify-between items-center px-3 gap-2 py-4">
            <dt className="text-gray-500">Created at</dt>
            <dd className="text-gray-800">
              <time dateTime={subreddit.createdAt.toDateString()}>
                {format(subreddit.createdAt, "MMMM d, yyyy")}
              </time>
            </dd>
          </div>
          <div className="flex justify-between items-center px-3 gap-2 py-4">
            <dt className="text-gray-500">Members</dt>
            <dd className="text-gray-800">{numMembers}</dd>
          </div>
          {session?.user.id === subreddit.creatorId ? (
            <div className="flex justify-between w-full items-center px-3 gap-2 py-4">
              <dt className="text-gray-500">Author</dt>
              <dd className="text-gray-800">You are the creator</dd>
            </div>
          ) : !creatorName ? null : (
            <div className="flex justify-between w-full items-center px-3 gap-2 py-4">
              <dt className="text-gray-500">Author</dt>
              <dd className="text-gray-800">{creatorName.name}</dd>
            </div>
          )}
        </dl>
        {session && (
          <SubscriptionBtn
            isSubscribed={isSubscribed}
            session={session}
            subreddit={subreddit}
          ></SubscriptionBtn>
        )}
      </div>
    </div>
  );
}
