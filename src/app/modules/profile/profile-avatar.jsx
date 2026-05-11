"use client";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/shared/ui/avatar";
import { RiLogoutBoxRLine } from "react-icons/ri";
const ProfileAvatar = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-12">
          <AvatarImage src={user.image} />
          <AvatarFallback className="bg-primary text-white font-black">
            <RiLogoutBoxRLine />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem onClick={() => signOut()}>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
