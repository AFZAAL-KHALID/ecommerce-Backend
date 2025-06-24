import express from "express";
import {addProduct, listProduct, removeProduct, singleProduct} from './../Controllers/ProductController.js'
import upload from "../Middleware/multer.js";
import adminAuth from "../Middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.single('image'), addProduct)
productRouter.get('/list', listProduct)
productRouter.post('/remove',adminAuth, removeProduct)
productRouter.post('/single',adminAuth, singleProduct)



export default productRouter;