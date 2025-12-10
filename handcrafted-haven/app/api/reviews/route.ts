import { NextRequest, NextResponse } from "next/server";
import { createReview, getReviewsFromDB } from "@/lib/actions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.productId || !body.userId || !body.userName || !body.rating || !body.text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const result = await createReview({
      productId: body.productId,
      userId: body.userId,
      userName: body.userName,
      rating: body.rating,
      text: body.text,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json(result.review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "productId query parameter is required" },
        { status: 400 }
      );
    }

    const reviews = await getReviewsFromDB(productId);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}