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

      <h1 className="text-3xl font-bold mb-6">Forget Password</h1>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email and we send password reset instructions
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

              <FieldGroup>
                <Field>
                  <Button
                    className="bg-blue-600 hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600 w-full"
                    type="submit"
                  >
                   
                     <Link href="/new-password"> Send Reset Link</Link>
                  </Button>

                  <FieldDescription className="px-6 text-center mt-3">
                    Remember password?{" "}
                    <Link href="/forget">Login</Link>
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
