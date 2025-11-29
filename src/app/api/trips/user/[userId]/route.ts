import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trips } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // Validate userId is provided and is a valid integer
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json(
        {
          error: 'Valid user ID is required',
          code: 'INVALID_USER_ID',
        },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId);

    // Query database for all trips where userId matches, ordered by createdAt descending
    const userTrips = await db
      .select()
      .from(trips)
      .where(eq(trips.userId, parsedUserId))
      .orderBy(desc(trips.createdAt));

    // Return array of trip objects (can be empty array if user has no trips)
    return NextResponse.json(userTrips, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      },
      { status: 500 }
    );
  }
}