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
import ConfirmPopup from "@/src/components/Alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type user = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
};

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
        setSuccessMessage("Add User Successfully ✅");
        setShowSuccess(true);
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

  // const profileData = [
  //   {
  //     avatar: "CN",
  //     name: "Name",
  //     email: "akansha@avtechnosys.com",
  //     defaultEmail: "akansha@avtechnosys.com",
  //   },
  // ];

  const [userData, setUserData] = useState<user[]>([]);
  const profileUser = userData[0];
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
        setSuccessMessage("Password Updated Successfully ✅");
        setShowSuccess(true);

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
    <>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm p-5">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <div>
          {profileUser && (
            <div className="p-10 bg-gray-50">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="" alt="profile" />
                      <AvatarFallback>
                        {profileUser.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {" "}
                        {profileUser.username}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {profileUser.email}
                      </p>
                      <Badge className="mt-2 bg-gray-200 text-gray-700">
                        <IconShield />
                        {profileUser.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-8 space-y-5">
                    <div className="flex flex-col gap-2">
                      <Label>Full Name</Label>
                      <Input defaultValue={profileUser.username} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Email</Label>
                      <Input defaultValue={profileUser.email}/>
                    </div>

                    <Button className="mt-4 w-fit hover:bg-sky-700 bg-sky-600">
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
                              <span className="text-gray-600 bg-gray-100 p-1 rounded-md">
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
                              <span className="text-gray-600 p-1 bg-gray-100 rounded-md">
                                {user?.role}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center gap-2">
                                <Button
                                  onClick={() => updatePassword(user.id)}
                                  className="bg-sky-600 hover:bg-sky-700 text-white"
                                >
                                  Change
                                </Button>
                                <ConfirmPopup
                                  title="Are you sure you want to delete this product?"
                                  alertTitle="Delete Product"
                                  description="This action is permanent and cannot be undone."
                                  confirmText="Delete"
                                  cancelText="Cancel"
                                  onConfirm={() => deleteProduct(user.id)}
                                >
                                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                                    Delete
                                  </Button>
                                </ConfirmPopup>
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
                     <Select value={role} onValueChange={setRole}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="sub-admin">Sub-Admin</SelectItem>
  </SelectContent>
</Select>
                      </div>

                      <Button
                        onClick={handleSubmit}
                        className="mt-4 w-fit hover:bg-sky-700 bg-sky-600"
                      >
                        {loading ? "Saving..." : "ADD USER"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>{" "}
            </div>
          )}
        </div>{" "}
      </div>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-72 text-center">
            <p className="text-lg font-semibold mb-4">{successMessage}</p>

            <Button
              onClick={() => {
                setShowSuccess(false);
              }}
              className="bg-sky-600 w-full hover:bg-sky-700"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
