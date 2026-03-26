import bcrypt from 'bcrypt';
import { prisma } from '../src/lib/prisma.js';

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {
      name: 'Admin 1',
      role: 'ADMIN',
    },
    create: {
      email: 'admin@gmail.com',
      name: 'Admin 1',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });