import prisma from '../lib/prisma.js';

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
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }
  });

  if (!user) 
    throw new Error('User not found');
  return user;
};

//Update profile
export const updateProfile = async (userId, dto) => {
  const user = await prisma.user.update({
    where: {id: userId},
    data: {
      name: dto.name,
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      cccd: dto.cccd,
    }
  });
  return user;
}