"use server";
import { auth } from "@/app/shared/prisma/lib/auth";
import db from "@/app/shared/prisma/lib/db";

export const getUserOrders = async () => {
  const session = await auth();

  return await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      vehicle: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
