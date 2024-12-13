import CommonForm from "@/components/common/Form";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
  };

  return (
    <DialogContent
      className="sm:max-w-[600px] max-h-dvh overflow-y-auto p-4" // Add overflow styles
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id</p>
            <Label>123456</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>13/12/2024</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>₦100,000</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>Pending</Label>
          </div>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div>
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>₦100,000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-1 text-muted-foreground">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Phone Number</span>
              <span>Alternative Number</span>
              <span>Email</span>
              <span>Note Information</span>
            </div>
          </div>
        </div>

        {/* CommonForm */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "Status",
                componentType: "select",
                type: "select",
                options: [
                  { value: "pending", label: "Pending" },
                  { value: "inProcess", label: " In Process" },
                  { value: "shipped", label: "Shipped" },
                  { value: "delivered", label: "Delivered" },
                  { value: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
