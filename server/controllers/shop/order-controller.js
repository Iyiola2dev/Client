export const createOrder = async (req, res) => {                                                                                                                                                                                                                                                                                                                                                                  
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;
                                                                                           
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paystack",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paystack-return",
        cancel_url: "http://localhost:5173/shop/paystack-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.name,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency : 'NGN',
              quantity: 'item.quantity'
            })),
          },
          amount:{
            currency : "NGN",
            total: totalAmount.toFixed(2)
          },
          description : 'description'
        },
      ],
    };
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
export const capturePayment = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
