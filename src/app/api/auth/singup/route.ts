import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, password } = body;

    // Validate all required fields are present
    if (!email || !username || !password) {
      return NextResponse.json(
        {
          error: 'All fields are required',
          code: 'MISSING_REQUIRED_FIELDS',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: 'Invalid email format',
          code: 'INVALID_EMAIL',
        },
        { status: 400 }
      );
    }

    // Validate username length (minimum 3 characters)
    if (username.trim().length < 3) {
      return NextResponse.json(
        {
          error: 'Username must be at least 3 characters',
          code: 'USERNAME_TOO_SHORT',
        },
        { status: 400 }
      );
    }

    // Validate password length (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json(
        {
          error: 'Password must be at least 6 characters',
          code: 'PASSWORD_TOO_SHORT',
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedUsername = username.trim();

    // Check if email already exists
    const existingEmailUser = await db
      .select()
      .from(users)
      .where(eq(users.email, sanitizedEmail))
      .limit(1);

    if (existingEmailUser.length > 0) {
      return NextResponse.json(
        {
          error: 'Email already exists',
          code: 'DUPLICATE_ENTRY',
        },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUsernameUser = await db
      .select()
      .from(users)
      .where(eq(users.username, sanitizedUsername))
      .limit(1);

    if (existingUsernameUser.length > 0) {
      return NextResponse.json(
        {
          error: 'Username already exists',
          code: 'DUPLICATE_ENTRY',
        },
        { status: 409 }
      );
    }

    // Hash password using bcrypt with salt rounds of 10
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const newUser = await db
      .insert(users)
      .values({
        email: sanitizedEmail,
        username: sanitizedUsername,
        passwordHash: passwordHash,
        points: 0,
        createdAt: new Date().toISOString(),
      })
      .returning();

    // Return created user without password hash
    const { passwordHash: _, ...userWithoutPassword } = newUser[0];

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      },
      { status: 500 }
    );
  }
}