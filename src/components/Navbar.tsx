import { AtSign } from "lucide-react";
import Link from "next/link";
import Button from "./ui/button";

export default function Navbar() {
  return (
    <nav className="fixed w-[80%] inset-0 h-fit mt-8 rounded-md mx-auto px-8 py-4 flex justify-between items-center gap-2 bg-gray-900 z-[50] ">
      <Link href="/" className="text-white flex gap-1">
        <AtSign strokeWidth={2.5} className="h-8 w-8 sm:h-6 sm:w-6" />
        <p className="hidden md:block text-xl font-semibold">ENSAA-SM</p>
      </Link>
      {/*search bar*/}
      <div className="flex gap-2">
        <Link href="/signup" className="">
          <Button className="text-white">
            <p>Signup</p>
          </Button>
        </Link>
        <Link href="/login" className="">
          <Button className="bg-white">
            <p>Login</p>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
