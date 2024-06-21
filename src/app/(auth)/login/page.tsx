"use client";
import React, { useState } from "react";

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Input } from "@/pre-components/input";
import { Label } from "@/pre-components/label";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form submitted");
  };

  const [isLoading, setIsLoading] = useState(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (e) {
      toast({
        title: "error",
        description: "There was an error",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const loginWithGithub = async () => {
    setIsLoading(true);
    try {
      await signIn("github");
    } catch (e) {
      toast({
        title: "error",
        description: "There was an error",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className=" w-[90%] lg:w-[60%] mx-auto rounded-md  p-4 md:p-8  bg-white dark:bg-gray-900">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back to ENSAA-SM
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to ENSAA-SM if you can
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="py-2 px-4 bg-gray-900 dark:bg-white text-white hover:bg-gray-500 hover:text-white dark:text-black relative group/btn  w-full  rounded-md h-10 font-semibold "
          type="submit"
        >
          Login &rarr;
        </button>

        <div className="bg-gray-900 dark:bg-white  my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className={cn(
              "relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]",
              {
                "opacity-50 cursor-not-allowed": isLoading,
              }
            )}
            onClick={loginWithGithub}
            disabled={isLoading}
          >
            {isLoading ? null : (
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            )}

            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className={cn(
              "relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]",
              {
                "opacity-50 cursor-not-allowed": isLoading,
              }
            )}
            onClick={() => {
              loginWithGoogle();
            }}
            disabled={isLoading}
          >
            {isLoading ? null : (
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            )}

            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
