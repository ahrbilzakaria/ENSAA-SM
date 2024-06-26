"use client";
import React, { useState } from "react";

import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { Input } from "@/pre-components/input";
import { Label } from "@/pre-components/label";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import CloseButton from "@/components/CloseButton";

type SignupParams = {
  state : boolean;
}

export default function SignupForm({state}: SignupParams) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form submitted");
  };

  const [isLoading, setIsLoading] = useState(false);
  const SignInWithGoogle = async () => {
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
  const SignInWithGithub = async () => {
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
      
      <div className="w-full flex items-start justify-between">
        <div><h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to ENSAA-SM
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Signup to ENSAA-SM if you can
      </p></div>
      {state && <CloseButton></CloseButton>}
      </div>
      

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
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
          Sign UP &rarr;
        </button>
        <p className="text-neutral-600 text-sm -mb-2 max-w-sm mt-2 dark:text-neutral-300">You already have an account ? <Link href={"/login"} className="font-bold underline-offset-1 underline text-neutral-900">Login</Link></p>
        <div className="bg-gray-900 dark:bg-white  my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={() => {
              SignInWithGithub();
            }}
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
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={() => {
              SignInWithGoogle();
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
