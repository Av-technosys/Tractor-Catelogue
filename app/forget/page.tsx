"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleForget(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);



    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;


    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/new-password");
    } else {
      alert(data.error);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Forget Password</h1>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter email to get reset link</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleForget}>
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input id="email" type="email" required />
              </Field>

              <Button className="w-full bg-blue-600 mt-3" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <FieldDescription className="text-center mt-3">
                Remember password? <Link href="/login">Login</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
