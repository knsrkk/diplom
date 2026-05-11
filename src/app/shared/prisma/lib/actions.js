import bcrypt from "bcryptjs";
import db from "./db";
import { signUpSchema } from "./schema";
import { executeAction } from "./executeAction";
const signUp = async (data) => {
  return executeAction({
    actionFn: async () => {
      const validatedData = signUpSchema.parse(data);

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const existingUser = await db.user.findUnique({
        where: { email: validatedData.email.toLowerCase() },
      });

      if (existingUser)
        throw new Error("Пользователь с таким email уже существует");

      await db.user.create({
        data: {
          name: validatedData.name,
          surname: validatedData.surname,
          email: validatedData.email.toLowerCase(),
          password: hashedPassword,
        },
      });
    },
    successMessage: "Успешная регистрация",
  });
};

export { signUp };
