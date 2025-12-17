import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import {  desc} from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
     try {
        const body = await req.json();
    
        const newUser = await db
          .insert(users)
          .values({
          username: body.username,
          email: body.email,
           password: body.password,
           role: body.role
    
          })
          .returning();
    
        return NextResponse.json({ success: true, data: newUser[0] });
      } catch (error) {
        console.error("USER POST ERROR:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
      }
    }
    
  export async function GET(){
   try{
      const data = await db
      .select({
          id: users.id,       
        username: users.username,
        email: users.email,
        password: users.password,
        role: users.role
        })
        .from(users)
        .orderBy(desc(users))
        return NextResponse.json({ success: true, data });
      }
      catch(error){
        return NextResponse.json({ success: false, error }, { status: 500 });
      }
    }



  