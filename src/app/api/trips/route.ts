import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trips } from '@/db/schema';
import { like } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(trips);

    if (search) {
      query = query.where(like(trips.destination, `%${search}%`));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      destination,
      budget,
      days,
      routeType,
      difficulty,
      transport,
      distance,
      co2,
      pointsEarned,
    } = body;

    // Validate all required fields are present
    if (
      userId === undefined ||
      !destination ||
      budget === undefined ||
      days === undefined ||
      !routeType ||
      !difficulty ||
      !transport ||
      !distance ||
      !co2 ||
      pointsEarned === undefined
    ) {
      return NextResponse.json(
        {
          error: 'All required fields must be provided',
          code: 'MISSING_REQUIRED_FIELDS',
        },
        { status: 400 }
      );
    }

    // Validate numbers
    const userIdNum = parseInt(userId);
    const budgetNum = parseInt(budget);
    const daysNum = parseInt(days);
    const pointsEarnedNum = parseInt(pointsEarned);

    if (
      isNaN(userIdNum) ||
      isNaN(budgetNum) ||
      isNaN(daysNum) ||
      isNaN(pointsEarnedNum)
    ) {
      return NextResponse.json(
        {
          error: 'Invalid number format',
          code: 'INVALID_NUMBER_FORMAT',
        },
        { status: 400 }
      );
    }

    // Validate budget and days are positive
    if (budgetNum <= 0 || daysNum <= 0) {
      return NextResponse.json(
        {
          error: 'Budget and days must be positive',
          code: 'INVALID_POSITIVE_VALUES',
        },
        { status: 400 }
      );
    }

    // Validate pointsEarned is non-negative
    if (pointsEarnedNum < 0) {
      return NextResponse.json(
        {
          error: 'Points earned must be non-negative',
          code: 'INVALID_POINTS_EARNED',
        },
        { status: 400 }
      );
    }

    // Sanitize string inputs
    const sanitizedDestination = destination.trim();
    const sanitizedRouteType = routeType.trim();
    const sanitizedDifficulty = difficulty.trim();
    const sanitizedTransport = transport.trim();
    const sanitizedDistance = distance.trim();
    const sanitizedCo2 = co2.trim();

    // Create trip with auto-generated timestamp
    const newTrip = await db
      .insert(trips)
      .values({
        userId: userIdNum,
        destination: sanitizedDestination,
        budget: budgetNum,
        days: daysNum,
        routeType: sanitizedRouteType,
        difficulty: sanitizedDifficulty,
        transport: sanitizedTransport,
        distance: sanitizedDistance,
        co2: sanitizedCo2,
        pointsEarned: pointsEarnedNum,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newTrip[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}