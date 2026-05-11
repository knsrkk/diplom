import db from "@/app/shared/prisma/lib/db";

export async function getUserProfile(userId) {
  return await db.user.findUnique({
    where: { id: userId },
    select: { name: true, surname: true, email: true, image: true, role: true },
  });
}
