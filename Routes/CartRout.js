import express from "express";
import UserAuth from "../Middleware/UserAuth.js";

import {
  addToCart,
  updateUserCart,
  getUserCart,
  decreaseUserCart,
  deleteCartProduct
} from "../Controllers/CartControllers.js";

const CartRouter = express.Router();

CartRouter.post("/get", UserAuth, getUserCart);
CartRouter.post("/add", UserAuth, addToCart);
CartRouter.post("/update", UserAuth, updateUserCart);
CartRouter.post("/decreseQty", UserAuth, decreaseUserCart);
CartRouter.post("/delete", UserAuth, deleteCartProduct);

export default CartRouter;
