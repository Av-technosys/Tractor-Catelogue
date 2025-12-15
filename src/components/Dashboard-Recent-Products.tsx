  "use client"
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  import Image from "next/image";

  const DashboardRecentProducts = ({productData}) => {

    return (
      <Card className="p-5 shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Products</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
         {[...productData]
          .sort((a, b) => b.id - a.id)  
          .slice(0, 5)                 
          .map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-20 h-16 rounded-lg bg-gray-200 overflow-hidden">
                  <Image
                    src={item.image || "/no-image.jpg"}  
                    alt={item.productName}
                    width={80}
                    height={60}
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-medium">{item.productName}</p>

                  <p className="text-sm text-gray-500">
                    {item.scottPartNo && `Scott No: ${item.scottPartNo}`}
                  </p>
                </div>
              </div>

              <p className="font-semibold">
                {item.price ? `₹${item.price}` : "—"}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  export default DashboardRecentProducts;
