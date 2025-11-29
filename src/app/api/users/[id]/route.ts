import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID is provided and is a valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid user ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Query database for user by ID
    const user = await db.select({
      id: users.id,
      email: users.email,
      username: users.username,
      points: users.points,
      createdAt: users.createdAt
    })
      .from(users)
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    // Check if user exists
    if (user.length === 0) {
      return NextResponse.json(
        { 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Return user object without password hash
    return NextResponse.json(user[0], { status: 200 });

  } catch (error) {
    console.error('GET user error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}