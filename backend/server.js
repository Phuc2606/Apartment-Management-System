import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; 
import { Pool } from 'pg';              
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,                                   
});

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

export { prisma };