import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-6">

  
      <h1 className="text-3xl font-bold mb-6">
        Registration From
      </h1>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <FieldDescription>
                  We use this to contact you. We will not share your email with anyone else.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input id="confirm-password" type="password" required />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              </Field>

              <FieldGroup>
                <Field>
                 <Button className="bg-blue-600 hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600" type="submit"> <Link href="/login">Create Account</Link></Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link href="/login">Login</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
