import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

//=========== REGISTER ===========//
export const register = async (email, password) => {
    //Validate input
    if (!email || !password) {
        throw new Error('Missing email or password');
    }
    //Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create User
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })
    // Generate JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn });
    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
}

//=========== LOGIN ===========//
export const login = async (email, password) => {
    //Validate input
    if (!email || !password) {
        throw new Error('Missing email or password');
    }
    //Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.deletedAt) {
        throw new Error('Invalid email or password');
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    // Generate JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    };
}
