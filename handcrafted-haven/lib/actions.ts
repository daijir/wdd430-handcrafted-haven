'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const RegisterSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['buyer', 'seller']),
});

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return 'Missing Fields. Failed to Register.';
    }

    const { name, email, password, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
        if (existingUser.length > 0) {
            return 'Email already in use.';
        }

        await sql`
      INSERT INTO users (id, name, email, password, role)
      VALUES (${crypto.randomUUID()}, ${name}, ${email}, ${hashedPassword}, ${role})
    `;
    } catch (error) {
        console.error('Failed to register user:', error);
        return 'Database Error: Failed to Register.';
    }

    redirect('/login');
}

const CreateProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.coerce.number().gt(0, 'Price must be greater than 0'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    imageUrl: z.string().min(1, 'Image is required'),
    sellerId: z.string().min(1, 'Seller ID is required'),
});

import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
    const validatedFields = CreateProductSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        category: formData.get('category'),
        description: formData.get('description'),
        imageUrl: formData.get('imageUrl'),
        sellerId: formData.get('sellerId'),
    });

    if (!validatedFields.success) {
        return { message: 'Missing or invalid fields.' };
    }

    const { name, price, category, description, imageUrl, sellerId } = validatedFields.data;
    const id = crypto.randomUUID();

    try {
        await sql`
        INSERT INTO products (id, name, description, price, category, seller_id, image_url)
        VALUES (${id}, ${name}, ${description}, ${price}, ${category}, ${sellerId}, ${imageUrl})
        `;
    } catch (error) {
        console.error('Failed to create product:', error);
        return { message: 'Database Error: Failed to Create Product.' };
    }

    revalidatePath(`/seller/${sellerId}`);
    revalidatePath('/products');
    return { message: 'Success' };
}

const CreateReviewSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    userId: z.string().min(1, 'User ID is required'),
    userName: z.string().min(1, 'User name is required'),
    rating: z.coerce.number().min(1).max(5),
    text: z.string().min(1, 'Review text is required'),
});

export async function createReview(data: {
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    text: string;
}) {
    const validatedFields = CreateReviewSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, message: 'Missing or invalid fields.' };
    }

    const { productId, userId, userName, rating, text } = validatedFields.data;
    const id = crypto.randomUUID();

    try {
        await sql`
            INSERT INTO reviews (id, product_id, user_id, user_name, rating, text)
            VALUES (${id}, ${productId}, ${userId}, ${userName}, ${rating}, ${text})
        `;
    } catch (error) {
        console.error('Failed to create review:', error);
        return { success: false, message: 'Database Error: Failed to Create Review.' };
    }

    revalidatePath(`/products/${productId}`);
    return {
        success: true,
        message: 'Success',
        review: {
            id,
            productId,
            userId,
            userName,
            rating,
            text,
            timestamp: new Date(),
        }
    };
}

export async function getReviewsFromDB(productId: string) {
    try {
        const reviews = await sql`
            SELECT id, product_id as "productId", user_id as "userId", user_name as "userName", 
                   rating, text, created_at as "timestamp"
            FROM reviews 
            WHERE product_id = ${productId}
            ORDER BY created_at DESC
        `;
        return reviews;
    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        return [];
    }
}
