import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { comments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    const { tripId } = params;

    // Validate tripId
    if (!tripId || isNaN(parseInt(tripId))) {
      return NextResponse.json(
        { 
          error: 'Valid trip ID is required',
          code: 'INVALID_TRIP_ID' 
        },
        { status: 400 }
      );
    }

    // Query comments for the specified trip
    const tripComments = await db
      .select()
      .from(comments)
      .where(eq(comments.tripId, parseInt(tripId)))
      .orderBy(desc(comments.createdAt));

    return NextResponse.json(tripComments, { status: 200 });
  } catch (error) {
    console.error('GET comments error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}