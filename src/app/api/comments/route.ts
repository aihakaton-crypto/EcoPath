import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { comments } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, tripId, username, comment, rating } = body;

    // Validate all required fields are present
    if (!userId || !tripId || !username || !comment || rating === undefined || rating === null) {
      return NextResponse.json(
        { 
          error: 'All required fields must be provided',
          code: 'MISSING_REQUIRED_FIELDS'
        },
        { status: 400 }
      );
    }

    // Validate userId is a valid integer
    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum)) {
      return NextResponse.json(
        { 
          error: 'Invalid number format for userId',
          code: 'INVALID_NUMBER_FORMAT'
        },
        { status: 400 }
      );
    }

    // Validate tripId is a valid integer
    const tripIdNum = parseInt(tripId);
    if (isNaN(tripIdNum)) {
      return NextResponse.json(
        { 
          error: 'Invalid number format for tripId',
          code: 'INVALID_NUMBER_FORMAT'
        },
        { status: 400 }
      );
    }

    // Validate rating is a valid integer
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum)) {
      return NextResponse.json(
        { 
          error: 'Invalid number format for rating',
          code: 'INVALID_NUMBER_FORMAT'
        },
        { status: 400 }
      );
    }

    // Validate rating is between 1 and 5
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { 
          error: 'Rating must be between 1 and 5',
          code: 'INVALID_RATING'
        },
        { status: 400 }
      );
    }

    // Trim and validate username
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      return NextResponse.json(
        { 
          error: 'Username cannot be empty',
          code: 'EMPTY_USERNAME'
        },
        { status: 400 }
      );
    }

    // Trim and validate comment
    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      return NextResponse.json(
        { 
          error: 'Comment cannot be empty',
          code: 'EMPTY_COMMENT'
        },
        { status: 400 }
      );
    }

    // Insert comment into database
    const newComment = await db.insert(comments)
      .values({
        userId: userIdNum,
        tripId: tripIdNum,
        username: trimmedUsername,
        comment: trimmedComment,
        rating: ratingNum,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newComment[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}