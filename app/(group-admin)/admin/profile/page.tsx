"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconShield } from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProfilePage() {
  const profileData = [
    {
      avatar: "CN",
      name: "Name",
      email: "akansha@avtechnosys.com",
      defaultEmail: "akansha@avtechnosys.com",
    },
  ];
  const users = [
    {
      img: "CN",
      name: "Khushi ",
      email: "khushi@gmail.com",
      password: "siddhi@123",
    },
    {
      img: "CN",
      name: "Prakhar",
      email: "Prakhar@gmail.com",
      password: "Prakhar@123",
    },
    {
      img: "CN",
      name: "Ajay",
      email: "ajay@avtechnosys.com",
      password: "Ajay123",
    },
    {
      img: "CN",
      name: "Bhavesh",
      email: "bhavesh@gmail.com",
      password: "Bhavesh",
    },
    {
      img: "CN",
      name: "Shalini",
      email: "shalini@gmail.com",
      password: "Sh@123",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-sm p-5">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div>
        {profileData.map((value, index) => (
          <div key={index} className="p-10 bg-gray-50">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" alt="profile" />
                    <AvatarFallback>{value.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{value.name}</h2>
                    <p className="text-gray-500 text-sm">{value.email}</p>
                    <Badge className="mt-2 bg-gray-200 text-gray-700">
                      <IconShield />
                      Sub Admin
                    </Badge>
                  </div>
                </div>
                <div className="mt-8 space-y-5">
                  <div className="flex flex-col gap-2">
                    <Label>Full Name</Label>
                    <Input />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input defaultValue={value.defaultEmail} disabled />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Phone</Label>
                    <Input placeholder="+1 234 567 8900" />
                  </div>

                  <Button className="mt-4 w-fit hover:bg-sky-600 bg-sky-600">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className=" bg-white p-6 mt-10 rounded-xl shadow-md">
              <h1 className="text-center text-3xl font-bold mb-6">
                All Registered Users
              </h1>

              <div className="rounded-xl bg-gray-50 ">
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Last Password</TableHead>
                        <TableHead>New Password</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {users.map((user, index) => (
                        <TableRow
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <TableCell className="flex items-center gap-3 py-4">
                            <div className="bg-gray-400 rounded-full">
                              <Avatar>{user.img}</Avatar>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">
                                {user.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="text-blue-600">
                            {user.email}
                          </TableCell>

                          <TableCell>
                            <span className="text-gray-600 bg-gray-100 rounded-md">
                              {user.password}
                            </span>
                          </TableCell>

                          <TableCell>
                            <Input placeholder="New password" />
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-2">
                              <Button className="bg-sky-600 hover:bg-sky-600 text-white">
                                Change
                              </Button>
                              <Button className="bg-sky-600 hover:bg-sky-600 text-white">
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <div className=" bg-gray-50 rounded-xl shadow-md  mt-10">
              <Card>
                <CardContent>
                  <h1 className="text-center text-3xl font-bold mb-6">
                    Add Users
                  </h1>
                  <div className="mt-8 space-y-5">
                    <div className="flex flex-col gap-2">
                      <Label>Full Name</Label>
                      <Input />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Email</Label>
                      <Input />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Phone</Label>
                      <Input placeholder="+1 234 567 8900" />
                    </div>

                    <Button className="mt-4 w-fit hover:bg-sky-600 bg-sky-600">
                      Add User
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>{" "}
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
