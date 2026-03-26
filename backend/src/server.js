import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware global
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// handle 404 NOT FOUND
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});