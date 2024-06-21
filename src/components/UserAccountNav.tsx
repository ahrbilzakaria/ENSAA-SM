import { User } from "next-auth";
import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AtSign, LogOut, User as US } from "lucide-react";

interface UserAccountNavProps {
  user: Pick<User, "email" | "image" | "name">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <div className="h-fit">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="outline-1 outline hover:outline-0 cursor-pointer outline-offset-2 outline-gray-200">
            <AvatarImage src={user.image!} alt={user.name!} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.name || "User"}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-gray-500 font-light text-[0.7rem] -mt-2.5">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <US className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {/* TODO: Add a logout functionality */}
            <form
              action={async () => {
                "use server";
                // await signOut();
              }}
            >
              <button type="submit" className="flex w-full items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAccountNav;
