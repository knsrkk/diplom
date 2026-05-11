import SignIn from "@/app/modules/auth/sign-in/sign-in";
import React from "react";

const page = () => {
  return (
    <main className="p-5 max-w-[1440px] w-full mx-auto min-h-screen flex items-center justify-center relative isolate">
      <div className="absolute inset-0 -z-10 bg-[#171b21]" />
      <SignIn />
    </main>
  );
};

export default page;
