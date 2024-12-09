import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress } from "@/store/shop/address-slice";
import CommonForm from "@/components/common/Form";
import AddressFormData from "@/components/common/AddressFormData";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  additionalNumber: "",
  notesInformation: "",
  region: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  console.log(user, "user");
  

  console.log("Form DataLexicon:", formData);
  const handleManageAddress = (e) => {
    e.preventDefault();

    const specialData = dispatch(
      addNewAddress({ ...formData, userId: user?.id })
    ).then((data) => {
      console.log(data);
    });

    if (specialData) {
      setFormData(initialAddressFormData);
      toast({
        title: "Address added successfully",
      });
    }
  };

  console.log(formData, "formData");
  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <div>
      <Card className="text-white bg-black">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <AddressFormData
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleManageAddress}
            // isBtnDisable={isFormValid()}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Address;
