import { v2 as cloudinary } from "cloudinary";
import productModel from "./../Models/productModel.js";

//function of Add product 1️⃣
const addProduct = async (req, res) => {
  //FIXME:  only admin could do this:
  try {
    const { name, description, price, category, bestSeller } = req.body;
    const image = req.file;

    const imageArray = [image].filter((item) => item !== undefined);

    // CLOUDINARY uploading and getting Url_
    const imageUrl = async (imageArray) => {
      try {
        const result = await cloudinary.uploader.upload(imageArray[0].path, {
          resource_type: "image",
        });
        return result.secure_url;
      } catch (error) {
        console.error("Upload failed:", error);
        return null;
      }
    };
    const uploadedUrl = await imageUrl(imageArray); //url

    const addingProduct = await productModel.create({
      // upload on DB Cluster
      name: name,
      description: description,
      price: price,
      image: uploadedUrl,
      category: category,
      bestSeller: bestSeller,
      quantity:1,
      date: Date.now(),
    });

    res.json({
      success: true,
      message: "successfully product added",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function of list product 2️⃣
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function of remove product ❌ 3️⃣
const removeProduct = async (req, res) => {
  try {
 
   const removed =  await productModel.findOneAndDelete({ _id: req.body.id });
   
    res.json({ success: true, message: "successfully deleted", removed });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function of single product info 4️⃣
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.body._id });

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
