import orderModel from "../Models/orderModel.js";
import userModel from "./../Models/userModel.js";



//placing orders using COD Method 1️⃣
const placeOrder = async (req, res) => {
  try {
    const { userId, Address, items, amount } = req.body;
    console.log(req.Address);

    const createOrder = await orderModel.create({
      userId,
      items,
      amount,
      Address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    res.json({ success: true, message: "order placed", createOrder });

    console.log(createOrder);

    // clear user Cart in Backend.
    userModel.findByIdAndUpdate(userId, { CartData: {} }).catch(console.error);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//placing orders using Stripe Method 2️⃣
const placeOrderStripe = async (req, res) => {
  try {
     const { userId, Address, items, amount } = req.body;
    console.log(req.Address);

    const createOrder = await orderModel.create({
      userId,
      items,
      amount,
      Address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

      


    res.json({ success: true, message: "order placed", createOrder });

    console.log(createOrder);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//placing orders using Razarpay Method 3️⃣
const placeOrderRazarpay = async (req, res) => {};






// all Order data for Admin Panel 👮
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// user Order data for Frontend 👦
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// update order status from Admin pannel
const updateStatus = async (req, res) => {
  try {
    const { orderId, Status } = req.body;
    
    
    const orderspl = await orderModel.findByIdAndUpdate(orderId, {Status},
      { new: true })
    console.log(orderspl);

    res.json({success:true, message:'Status Updated ✅'})
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazarpay,
  allOrders,
  userOrders,
  updateStatus,
};
