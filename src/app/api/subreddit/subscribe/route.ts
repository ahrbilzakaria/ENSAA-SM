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
    if (subscriptionExists) {
      return new Response("You are already subscribed", { status: 400 });
    }

    await db.subscription.create({
      data: { subredditId, userId: session.user.id },
    });
    return new Response(subredditId);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }
    return new Response("Couldn't subscribe to the community", { status: 422 });
  }
}
