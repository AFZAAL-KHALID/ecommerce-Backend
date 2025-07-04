import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  description: { type: "String", required: true },
  price: { type: "Number", required: true },
  image: { type: "String", required: true },
  category: { type: "String", required: true },
  bestSeller: { type: "boolean" },
  quantity:{type: 'Number'},
  date: { type: "Number", required: true },
});


const productModel = mongoose.model.product || mongoose.model("product", productSchema);

export default productModel