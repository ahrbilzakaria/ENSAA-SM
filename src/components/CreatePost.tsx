"use client";
import { Session } from "next-auth";
import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/Avatar";
import { Input } from "@/pre-components/input";
import Button from "./ui/button";
import { File, Image, Link } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CreatePostProps {
  session: Session | null;
}

const CreatePost: FC<CreatePostProps> = ({ session }: CreatePostProps) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <div className="w-full border flex  justify-between items-center gap-2 p-4 sm:p-3 rounded-md">
      <div className="relative">
        <Avatar>
          <AvatarImage
            src={session?.user.image! || "/avatar_placeholder.png"}
            alt={session?.user.name!}
            referrerPolicy="no-referrer"
          />
        </Avatar>
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-600 outline outline-2 outline-white"></span>
      </div>
      <div className="flex w-full justify-between items-center gap-2 ">
        <Input
          readOnly
          onClick={() => router.push(path + "/post")}
          className=" rounded-md outline outline-2 outline-zinc-300"
          placeholder="What's on your mind?"
        />
        <div className="flex items-center gap-1">
          {" "}
          <Button
            onClick={() => router.push(path + "/post")}
            className="bg-gray-900 text-white p-2"
          >
            <Link></Link>
          </Button>
          <Button
            onClick={() => router.push(path + "/post")}
            className="bg-gray-900 text-white p-2"
          >
            <Image></Image>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
