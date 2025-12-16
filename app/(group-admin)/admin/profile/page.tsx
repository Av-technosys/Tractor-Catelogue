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
import { useEffect, useState } from "react";

type user = {
  id: number;
  username: string;
  email: string;
  password: string;
  role:string;
};

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      username,
      email,
      password,
      role,
    };
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }
  // if (!emailRegex.test(email)) {
  //   alert("Please enter a valid email address (e.g., name@gmail.com)");
  //   return;
  // }
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(" user api data", data);
      if (data.success) {
        setUserData((prev) => [data.data, ...prev]);
      }
      setUsername("");
      setEmail("");    
      setPassword("");
      setRole("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const profileData = [
    {
      avatar: "CN",
      name: "Name",
      email: "akansha@avtechnosys.com",
      defaultEmail: "akansha@avtechnosys.com",
    },
  ];

  const [userData, setUserData] = useState<user[]>([]);
  const getUserData = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUserData(data.data);
    } catch (error) {
      console.log("error fetching users", error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const [newPasswords, setNewPasswords] = useState({});
  const updatePassword = async (id: number) => {
    const newPassword = newPasswords[id];
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Password updated successfully!");
        setNewPasswords((prev) => ({ ...prev, [id]: "" }));
        getUserData();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        getUserData();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                        <TableHead>Role</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {userData.map((user, index) => (
                        <TableRow
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <TableCell className="flex items-center gap-3 py-4">
                            <div className="bg-gray-400 rounded-full">
                              <Avatar>{user?.username}</Avatar>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">
                                {user?.username}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="text-blue-600">
                            {user?.email}
                          </TableCell>

                          <TableCell>
                            <span className="text-gray-600 bg-gray-100 rounded-md">
                              {user?.password}
                            </span>
                          </TableCell>

                          <TableCell>
                            <Input
                              placeholder="New password"
                              value={newPasswords[user.id] || ""}
                              onChange={(e) =>
                                setNewPasswords({
                                  ...newPasswords,
                                  [user.id]: e.target.value,
                                })
                              }
                            />
                          </TableCell>
                           <TableCell>
                            <span className="text-gray-600 bg-gray-100 rounded-md">
                              {user?.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-2">
                              <Button
                                onClick={() => updatePassword(user.id)}
                                className="bg-sky-600 hover:bg-sky-600 text-white"
                              >
                                Change
                              </Button>
                              <Button
                                onClick={() => deleteProduct(user.id)}
                                className="bg-sky-600 hover:bg-sky-600 text-white"
                              >
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
                      <Input
                        placeholder="Full Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Email</Label>
                      <Input
                      type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Password</Label>
                      <Input
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Role</Label>
                      <Input
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="mt-4 w-fit hover:bg-sky-600 bg-sky-600"
                    >
                      {loading ? "Saving..." : "ADD USER"}
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
