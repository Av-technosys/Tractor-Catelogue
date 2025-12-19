import { NextResponse } from "next/server";

export async function POST() {
  // Response create
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete("auth");

  return response;
}
