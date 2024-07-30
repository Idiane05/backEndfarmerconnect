import orderModel from "../models/orderModel.js";
import userModel from ".././models/userMode.js";
// import paystack from 'paystack-api'
// Place order controller
// Initialize Paystack with your secret key
// const paystackInstance = paystack(process.env.PAYSTACK_SECRET_KEY);

// Place order controller
const placeOrder = async (req, res) => {
  //   const frontend_url = "http://localhost:5173";

  try {
    const { userId, items, address, amount } = req.body;

    // Create a new order
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
    });

    // Save the new order to the database
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create line items for the order
    const line_items = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // Assuming the price conversion is needed
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as a line item
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery fee",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // Create a Paystack payment session
    // const session = await paystackInstance.checkout.sessions.create({
    //   line_items: line_items,
    //   mode: 'payment',
    //   success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    //   cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    // });

    // Return success response with the session URL
    res.json({ message: "Order placed successfully", success: true });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error placing order", success: false });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res
        .status(200)
        .json({ message: "successfully verified && Paid", success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res
        .status(200)
        .json({ message: "Order cancelled due to is unpaid", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying order", success: false });
  }
};
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Listing orders for admin panel
const listOrders = async(req,res)=>{
    try {
      const ordes = await orderModel.find({});
      res.status(200).json({ success:true, data:ordes, message:"Orders found"});
    } catch (error) {
      console.log(error);
      res.status(500).json({success:false, message:error.message});
    }
}

// updating the order status
const updateStatus = async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
