import db from "@/app/shared/prisma/lib/db";

export async function getUserRole(userId) {
  return await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
}
