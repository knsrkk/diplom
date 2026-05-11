import { auth } from "@/app/shared/prisma/lib/auth";

import { Card, CardContent, CardHeader } from "@/app/shared/ui/card";

import { getUserProfile } from "@/lib/get-user-profile";
import React from "react";
import ProfileAvatar from "./profile-avatar";
import { Input } from "@/app/shared/ui/input";
import { Separator } from "@/app/shared/ui/separator";
import { CustomLink } from "@/app/shared/ui/custom-link";

const Profile = async () => {
  const session = await auth();
  if (!session) return null;
  const userData = await getUserProfile(session?.user.id);
  return (
    <section>
      <Card className="bg-[#282A2D] border-none text-white max-w-xl">
        <CardHeader className="flex items-center gap-2">
          <ProfileAvatar user={userData} />
          <h2 className="flex flex-col font-bold text-2xl">
            {userData.name} {userData.surname}
            <span className="text-[#C0C0C0] text-sm font-medium">
              {userData.email}
            </span>
          </h2>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          <label>
            <span>Имя</span>
            <Input
              className="bg-white py-6 text-black"
              disabled
              defaultValue={userData.name}
            />
          </label>
          <label>
            <span>Фамилия</span>
            <Input
              className="bg-white py-6 text-black"
              disabled
              defaultValue={userData.surname}
            />
          </label>
          <label>
            <span>Почта</span>
            <Input
              className="bg-white py-6 text-black"
              disabled
              defaultValue={userData.email}
            />
          </label>
          <Separator />
          <div className="flex flex-col gap-4">
            <CustomLink className="w-fit" href={"/profile/orders"}>Мои заказы</CustomLink>
            {userData.role === "ADMIN" && (
              <CustomLink className="w-fit" href={"/dashboard/admin"}>Админ панель</CustomLink>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;
