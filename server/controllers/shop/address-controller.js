import Address from "../../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const {
      userId,
      address,
      city,
      fullName,
      email,
      phoneNumber,
      additionalNumber,
      notesInformation,
      region,
    } = req.body;

    if (
      !userId ||
      !address ||
      !city ||
      !phoneNumber ||
      !additionalNumber ||
      !notesInformation ||
      !region ||
      !email ||
      !fullName
    ) {
      return res.status(400).json({
        success: false,
        message: "Invaild data provided",
      });
    }

    const addressExist = await Address.findOne({ address, city})
   
    if(addressExist){
      return res.status(400).json({
        success: false,
        message: "Address already exists .",
        field: "address", // You can specify the field that is duplicated
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      fullName,
      email,
      phoneNumber,
      additionalNumber,
      notesInformation,
      region,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
      message: "Address added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding address",
      errorMessage: error.message,
    });
  }
};

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const addressList = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
      message: "Address fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding address",
      errorMessage: error.message,
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User id and address id is required",
      });
    }

    const updatedAddress = await Address.finsOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedAddress,
      message: "Address updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding address",
      errorMessage: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User id and address id is required",
      });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedAddress,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding address",
      errorMessage: error.message,
    });
  }
};
