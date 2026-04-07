import 'dotenv/config';
import mongoose from 'mongoose';
import argon2 from 'argon2';
import { env } from '../src/config/env';
import UserModel from '../src/modules/users/user.model';

const users = [
  {
    firstName: 'Sarra',
    lastName: 'Admin',
    email: 'admin@sgcf.tn',
    password: 'Admin@1234',
    role: 'admin' as const,
  },
  {
    firstName: 'Ahmed',
    lastName: 'Manager',
    email: 'manager@sgcf.tn',
    password: 'Manager@1234',
    role: 'manager' as const,
  },
  {
    firstName: 'Ines',
    lastName: 'Employe',
    email: 'employe@sgcf.tn',
    password: 'Employe@1234',
    role: 'employe' as const,
  },
  {
    firstName: 'Mohamed',
    lastName: 'Client',
    email: 'client@sgcf.tn',
    password: 'Client@1234',
    role: 'client' as const,
  },
];

const seed = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log('Connected to MongoDB');

  await UserModel.syncIndexes();
  console.log('User indexes synchronized (drops legacy indexes not in schema)');

  await UserModel.deleteMany({});
  console.log('Cleared existing users');

  const hashed = await Promise.all(
    users.map(async (u) => ({
      ...u,
      password: await argon2.hash(u.password, { type: argon2.argon2id }),
    }))
  );

  await UserModel.insertMany(hashed);
  console.log(`Seeded ${hashed.length} users:`);
  hashed.forEach((u) => console.log(`  → [${u.role}] ${u.email}`));

  await mongoose.disconnect();
  console.log('Done. Disconnected.');
  process.exit(0);
};

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes('whitelist') || msg.includes('ServerSelection') || msg.includes('ENOTFOUND')) {
    console.error(
      '\n→ MongoDB inaccessible : vérifiez Network Access sur Atlas, ou utilisez MONGO_URI=mongodb://localhost:27017/sgcf avec MongoDB local.\n'
    );
  }
  process.exit(1);
});
