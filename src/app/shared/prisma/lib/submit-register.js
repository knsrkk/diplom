"use server";

import { redirect } from "next/navigation";
import { signUp } from "./actions";

const onSubmit = async (data) => {
  const res = await signUp(data);
  console.log(res);
  
  if (res.success) {
    redirect("/auth/sign-in");
  }
};

export { onSubmit };
