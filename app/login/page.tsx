"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">

     
      <h1 className="text-3xl font-bold mb-6">Login</h1>


      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              
            
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

             
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </Field>

             
              <FieldGroup>
                <Field>
                 <Button className="bg-blue-600 hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600 " type="submit"> <Link href="/admin">Login</Link></Button>

                  <FieldDescription className="px-6 text-center mt-3">
                    Donot have an account?{" "}
                    <Link href="/forget">Forget Password</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
