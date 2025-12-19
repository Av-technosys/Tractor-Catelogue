// import { db } from "@/src/db/client";
// import { users } from "@/src/db/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function PUT(req: Request, { params }) {
//   try {
//     const resolvedParams = await params;
//     const id = resolvedParams.id;
//     const body = await req.json();
//     const updated = await db
//       .update(users)
//       .set({
//         password: body.password,
//       })
//       .where(eq(users.id, id))
//       .returning();
//     return NextResponse.json({
//       success: true,
//       data: updated[0],
//     });
//   } catch (error) {
//     console.error("Update Error:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: Request, { params }) {
//   try {
//     const resolvedParams = await params;
//     const userId = resolvedParams.id;
//     if (!userId) {
//       return NextResponse.json(
//         { success: false, error: "Missing ID" },
//         { status: 400 }
//       );
//     }
//     const deleted = await db
//       .delete(users)
//       .where(eq(users.id, userId))
//       .returning();

//     return NextResponse.json({
//       success: true,
//       data: deleted[0],
//     });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { encryptPassword } from "@/lib/encryption";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

type UpdateUser = Partial<typeof users.$inferInsert>;

export async function PUT(req: Request, { params }: Props) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updateData: UpdateUser = {};

    if (body.password) {
      updateData.password = encryptPassword(body.password);
    }

    if (body.email) updateData.email = body.email;

    const updated = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated[0],
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id: rawId } = await params;
    const userId = Number(rawId);

    if (!userId || isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const deleted = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deleted[0],
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
