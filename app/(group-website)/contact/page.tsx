import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
} from "@tabler/icons-react";

export default function Page() {
  return (
    <div className="w-full">
      {/* ===== Header ===== */}
      <div className="bg-sky-600 py-16 sm:py-12 text-center text-white px-4">
  <h1 className="text-4xl sm:text-4xl font-bold">
    Contact Us
  </h1>

  <p className="text-xl sm:text-xl mt-2 sm:mt-3 opacity-90 max-w-2xl mx-auto">
    Have questions? We here to help you find the right parts.
  </p>
</div>


      {/* ===== Main Content ===== */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ===== Contact Form ===== */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <p className="text-sm text-gray-500">
              Fill out the form and we’ll get back to you within 24 hours.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full Name" />
              <Input type="email" placeholder="Email" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Phone Number" />
              <Input placeholder="Subject" />
            </div>

            <Textarea placeholder="Tell us about the parts you're looking for..." />

            <Button className="w-full bg-sky-600 hover:bg-sky-700">
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* ===== Contact Info ===== */}
        <div className="space-y-4">

          <Card>
            <CardContent className="flex gap-4 p-5">
              <IconMapPin className="text-blue-600" size={22} />
              <div>
                <p className="font-semibold">Our Location</p>
                <p className="text-sm text-gray-500">
                  123 Industrial Avenue <br />
                  Parts City, PC 12345 <br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 p-5">
              <IconPhone className="text-blue-600" size={22} />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-gray-500">
                  +1 (555) 123-4567 <br />
                  +1 (555) 987-6543
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 p-5">
              <IconMail className="text-blue-600" size={22} />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-gray-500">
                  info@scottparts.com <br />
                  support@scottparts.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 p-5">
              <IconClock className="text-blue-600" size={22} />
              <div>
                <p className="font-semibold">Business Hours</p>
                <p className="text-sm text-gray-500">
                  Monday – Friday: 9:00 AM – 6:00 PM <br />
                  Saturday: 9:00 AM – 4:00 PM <br />
                  Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
