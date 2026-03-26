import prisma from "../lib/prisma.js";
import { uploadFile } from "../config/s3.js";

export const getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      gender: true,
      dateOfBirth: true,
      cccd: true,
      role: true,
      roomId: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const updateProfile = async (userId, dto, file) => {
  let avatarUrl;

  if (file) {
    const ext = file.originalname.split(".").pop().toLowerCase();
    const key = `avatars/${userId}-${Date.now()}.${ext}`;

    avatarUrl = await uploadFile(file, key);
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      name: dto.name,
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      cccd: dto.cccd,
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
};