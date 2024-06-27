"use client";

import { Session } from "next-auth";
import { FC, startTransition } from "react";
import Button from "./ui/button";
import { Subreddit } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import type { SubscribeToSubredditPayload } from "../lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { useLoginToasts } from "@/hooks/use-login-toasts";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubscriptionBtnProps {
  isSubscribed: boolean;
  subreddit: Pick<Subreddit, "id" | "name" | "creatorId">;
  session: Session | null;
}

const SubscriptionBtn: FC<SubscriptionBtnProps> = ({
  isSubscribed,
  subreddit,
  session,
}: SubscriptionBtnProps) => {
  const router = useRouter();
  const { loginToast } = useLoginToasts();
  const { mutate: Subscribe, isPending } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId: subreddit.id,
      };
      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err: Error) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "Error",
        description: "There was an error",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      toast({
        title: "Subscribed",
        description: `You are now a member of c/${subreddit.name}`,
        variant: "default",
      });
    },
  });

  return (
    <div className="w-full">
      {isSubscribed ? (
        session?.user.id === subreddit.creatorId ? null : (
          <Button className="w-full bg-red-600 hover:bg-red-400 text-white">
            Unubscribe
          </Button>
        )
      ) : (
        <Button className="w-full bg-gray-900  text-white" onClick={Subscribe}>
          Subscribe
        </Button>
      )}
    </div>
  );
};

export default SubscriptionBtn;
