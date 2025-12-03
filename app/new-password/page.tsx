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
  FieldGroup,
  FieldLabel,

} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-6">Create New Password</h1>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Set New Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>

              {/* New Password */}
              <Field>
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  required
                />
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter new password"
                  required
                />
              </Field>

              {/* Button */}
              <FieldGroup>
                <Field>
                  <Button
                    className="bg-blue-600 hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600 w-full"
                    type="submit"
                  >
                  <Link href="/login">Login</Link>
                  </Button>

                  
                </Field>
              </FieldGroup>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
