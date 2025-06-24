import express from "express";
import adminAuth from "../Middleware/adminAuth.js";
import UserAuth from "../Middleware/UserAuth.js";

import {
  allOrders,
  updateStatus,
  placeOrder,
  placeOrderStripe,
  placeOrderRazarpay,
  userOrders,
} from "../Controllers/OrderController.js";

const OrderRouter = express.Router();

// admin features
OrderRouter.post("/list", adminAuth, allOrders);
OrderRouter.post("/status", adminAuth, updateStatus);

// payment features
OrderRouter.post("/place", UserAuth, placeOrder);
OrderRouter.post("/stripe", UserAuth, placeOrderStripe);
OrderRouter.post("/razarpay", UserAuth, placeOrderRazarpay);

// user orders
OrderRouter.post("/userOrders", UserAuth, userOrders);

export default OrderRouter;
 