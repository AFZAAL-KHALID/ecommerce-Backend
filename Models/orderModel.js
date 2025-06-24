import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {type: 'String', required:true}, //from middleware
    items: {type: 'Array', required: true}, //from frontend
    amount: {type: 'Number', required: true}, //from forntend
    Address: {type: 'Object', required: true}, // from frontend
    Status: {type: 'String', required: true, default: 'Order Placed'},
    paymentMethod: {type: 'String', required: true},
    payment: {type: 'boolean', required: true, default:false},
    date:{type: 'Number', required: true}

})

const orderModel = mongoose.model.order || mongoose.model('order', orderSchema)

export default orderModel