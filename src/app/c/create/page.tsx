"use client";
import { FC, useState } from "react";
import { Input } from "@/pre-components/input";
import { Label } from "@/pre-components/label";
import CloseButton from "@/components/CloseButton";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { toast } from "@/hooks/use-toast";
import { useLoginToasts } from "@/hooks/use-login-toasts";

interface pageProps {
  state: boolean;
}

const page: FC<pageProps> = ({ state }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateCommunity();
  };
  const [name, setName] = useState("");
  const { loginToast } = useLoginToasts();
  const router = useRouter();
  const { mutate: CreateCommunity, isPending } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: name,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Subreddit already exists",
            description: "Please try a different name ",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid community name",
            description:
              "Please choose a name with between 5 and 25 characters",
            variant: "destructive",
          });
        }
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
    onSuccess: (data) => {
      router.push(`/c/${data}`);
    },
  });

  return (
    <div className=" w-[90%] lg:w-[60%] mx-auto rounded-md  p-4 md:p-8  bg-white dark:bg-gray-900">
      <div className="w-full flex items-start justify-between">
        <div>
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Create your community
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Community names including capitalization cannot be changd.
          </p>
        </div>
        {state && <CloseButton></CloseButton>}
      </div>
      <hr className="bg-gray-500 h-px my-3" />
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your community name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </LabelInputContainer>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="py-2 px-4 bg-gray-900 dark:bg-white text-white hover:bg-gray-500 hover:text-white dark:text-black relative group/btn   rounded-md h-10 font-semibold "
            type="submit"
            disabled={isPending || name === ""}
          >
            Create &rarr;
          </button>
          <button
            className="py-2 px-4  dark:bg-white outline outline-1 border-gray-900 hover:bg-gray-500 hover:text-white dark:text-black relative group/btn    rounded-md h-10 font-semibold "
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
