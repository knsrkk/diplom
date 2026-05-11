import React from "react";
import Profile from "../modules/profile/profile";
import ProfileBreadcrumbs from "../modules/profile/profile-breadcrumbs";

const page = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5">
      <ProfileBreadcrumbs />
      <Profile />
    </main>
  );
};

export default page;
