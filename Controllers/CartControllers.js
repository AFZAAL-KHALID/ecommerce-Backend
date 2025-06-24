import userModel from "../Models/userModel.js";

// add products to User Cart 1️⃣
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId); //finding who is the user

    const CartData = await userData.CartData; //help of userModule .getting object userCart . by default empty {}

    //FIXME:⬇️  KOI SAMJ NI AI 🤯
    if (CartData[itemId]) {
      CartData[itemId] += 1;
    } else {
      CartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { CartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  update/ increase user Cart 2️⃣
const updateUserCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);

    //#finding who is the user
    const CartData = await userData.CartData;

    //#help of userModule we getting object userCart . by default empty {}
    if (itemId) {
      CartData[itemId] = quantity + 1;
    }
    console.log("CartData[itemId]:", CartData[itemId]);

    const updateCartData = await userModel.findByIdAndUpdate(
      userId,
      { CartData },
      { new: true } // returns the updated document
    );

    res.json({
      success: true,
      message: "successfully updated",
      updateCartData: userData.CartData, // Make sure it's an array
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//  update user Cart 2️⃣
const decreaseUserCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    console.log(userId, itemId, quantity);

    const userData = await userModel.findById(userId);
    console.log("userData:", userData);
    //#finding who is the user

    const CartData = await userData.CartData;
    console.log("CartData:", CartData);
    //#help of userModule we getting object userCart . by default empty {}
    if (itemId && CartData[itemId] > 1) {
      CartData[itemId] = quantity - 1;
    }
    console.log("CartData[itemId]:", CartData[itemId]);

    const updateCartData = await userModel.findByIdAndUpdate(
      userId,
      { CartData },
      { new: true } // returns the updated document
    );

    res.json({
      success: true,
      message: "successfully updated",
      updateCartData: userData.CartData, // Make sure it's an array
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// add get UserCart Data 3️⃣
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body; //userId getter form middleware userAuth

    const userData = await userModel.findById(userId);

    let CartData = await userData.CartData;

    res.json({ success: true, CartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// add get UserCart Data 5️⃣
const deleteCartProduct = async (req, res) => {
  try {
    const { userId, itemId} = req.body; //userId getter form middleware userAuth
    const userData = await userModel.findById(userId);

    let CartData = userData.CartData || {};

    // Delete the specific item
    console.log(itemId);

    if (CartData.hasOwnProperty(itemId)) {
      delete CartData[itemId];
    }

    const updateUserCart = await userModel.findByIdAndUpdate(
      userId,
      { CartData },
      { new: true }
    );
    res.json({ success: true, updateUserCart });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addToCart,
  updateUserCart,
  getUserCart,
  decreaseUserCart,
  deleteCartProduct,
};
