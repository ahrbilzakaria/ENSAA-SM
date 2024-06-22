import Button from "@/components/ui/button";
import { Home as HomeIcon, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  return <div>
    <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-6 py-4">
      
      <div className="overflow-hidden flex gap-2 items-center h-fit rounded-md bg-gray-900 px-3 py-2 md:px-4 text-white order-first md:order-last ">
        <HomeIcon></HomeIcon>
        <h2 className="font-semibold py-2 ">Home</h2>
      </div>
      <div className="px-3 -py-2 leading-6">
        <p className="text-sm text-zinc-500 text-start">Your personal Ensaa-sm homepage. Discover more about your interests and feel free to share your thoughts. </p>
      </div>
      <Link href="/c/create"><Button className="w-full bg-gray-700 flex items-center justify-center text-white gap-2"><Plus></Plus> Create a new community</Button>
      </Link>
      </div>
  </div>;
}
