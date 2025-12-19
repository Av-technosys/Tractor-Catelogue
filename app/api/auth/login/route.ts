// import { NextResponse } from "next/server";
// import { db } from "@/src/db/client";
// import { users } from "@/src/db/schema";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and Password are required" },
//         { status: 400 }
//       );
//     }

//     const user = await db.select().from(users).where(eq(users.email, email));

//     if (user.length === 0) {
//       return NextResponse.json(
//         { error: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user[0].password!);

//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     const response = NextResponse.json({
//       success: true,
//       message: "Login Successful",
//       user: {
//         id: user[0].id,
//         username: user[0].username,
//         email: user[0].email,
//       },
//     });

//       response.cookies.set("auth", "true", {
//       httpOnly: true,     
//       path: "/",           
//       sameSite: "lax",    
//       // secure: true,     // production (HTTPS) me enable karna
//     });

//     return response;


//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     return NextResponse.json({ error: "Server Error" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { decryptPassword } from "@/lib/encryption";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }

    const userResult = await db.select().from(users).where(eq(users.email, email));

    if (userResult.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = userResult[0];
    const dbPassword = user.password!;
    let isMatch = false;

    if (dbPassword.startsWith("$2a$") || dbPassword.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(password, dbPassword);
    } 

    else {
      const decrypted = decryptPassword(dbPassword);
      isMatch = (decrypted === password);
    }



    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        // role: user.role, // role bhi bhej de taaki frontend use kar sake
      },
    });

    response.cookies.set("auth", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}