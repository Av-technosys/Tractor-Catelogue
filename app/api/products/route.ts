import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { products } from "@/src/db/schema";

export async function GET() {
  const data = await db.select().from(products);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newProduct = await db.insert(products).values(body).returning();
  return NextResponse.json(newProduct);
}
