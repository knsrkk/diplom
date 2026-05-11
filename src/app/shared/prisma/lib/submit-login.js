"use server";

import { signIn } from "./auth";
import { executeAction } from "./executeAction";

const onSubmit = async (data) => {
  await executeAction({
    actionFn: async () => {
      await signIn("credentials", data);
    },
  });
};

export { onSubmit };
