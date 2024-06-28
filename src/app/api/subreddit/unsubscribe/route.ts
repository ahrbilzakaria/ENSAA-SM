import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { subredditId } = SubredditSubscriptionValidator.parse(body);
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });
    if (!subscriptionExists) {
      return new Response("You are not subscribed", { status: 400 });
    }
    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
      },
    });
    if (subreddit?.creatorId == session.user.id) {
      return new Response("You cannot unsubscribe from your own community", {
        status: 400,
      });
    }
    await db.subscription.delete({
      where: {
        userId_subredditId: {
          userId: session.user.id,
          subredditId,
        },
      },
    });
    return new Response(subredditId);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }
    return new Response("Couldn't not unsubscribe from the community", {
      status: 422,
    });
  }
}
