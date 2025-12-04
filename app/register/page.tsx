// import React from 'react'
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "../../components/ui/field"
// import { Input } from "@/components/ui/input"
// import Link from 'next/link'

// export default function Page() {
//   return (
//     <div className="flex flex-col items-center justify-center p-6">


//       <h1 className="text-3xl font-bold mb-6">
//         Registration From
//       </h1>

//       <Card className="w-full max-w-lg">
//         <CardHeader>
//           <CardTitle>Create an account</CardTitle>
//           <CardDescription>
//             Enter your information below to create your account
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="name">Full Name</FieldLabel>
//                 <Input id="name" type="text" placeholder="John Doe" required />
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//                 <FieldDescription>
//                   We use this to contact you. We will not share your email with anyone else.
//                 </FieldDescription>
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="password">Password</FieldLabel>
//                 <Input id="password" type="password" required />
//                 <FieldDescription>
//                   Must be at least 8 characters long.
//                 </FieldDescription>
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="confirm-password">
//                   Confirm Password
//                 </FieldLabel>
//                 <Input id="confirm-password" type="password" required />
//                 <FieldDescription>
//                   Please confirm your password.
//                 </FieldDescription>
//               </Field>

//               <FieldGroup>
//                 <Field>
//                  <Button className="bg-blue-600 hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600" type="submit"> <Link href="/login">Create Account</Link></Button>
//                   <FieldDescription className="px-6 text-center">
//                     Already have an account? <Link href="/login">Login</Link>
//                   </FieldDescription>
//                 </Field>
//               </FieldGroup>

//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }










"use client";

import React, { useState } from 'react'
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
import { useRouter } from 'next/navigation'

export default function Page() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirm-password") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/login");
    } else {
      alert(data.error || "Registration failed");
    }

    setLoading(false);
  }

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
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Full Name</FieldLabel>
                <Input id="username" type="text" placeholder="John Doe" required />
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
                  <Button
                    className="bg-blue-600 hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </Button>

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
