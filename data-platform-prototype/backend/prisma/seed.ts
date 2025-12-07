import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User'
    }
  });

  await prisma.dataset.createMany({
    data: [
      {
        title: 'Dermato-Image Collection 1',
        description: 'High-quality dermatoscopic images with annotations.',
        price: 199.0,
        status: 'PUBLISHED',
        ownerId: user.id
      },
      {
        title: 'Histology Slides Set A',
        description: 'WSI-based dataset suitable for AI training.',
        price: 499.0,
        status: 'DRAFT',
        ownerId: user.id
      }
    ]
  });

  console.log('Seed data created');
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
