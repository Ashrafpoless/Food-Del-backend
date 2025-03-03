import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";


dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



const orderController = {
    placeOrder:async(req, res) =>{
        try {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address,
            })
            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

            // cr
            const line_item = req.body.items.map((item)=>({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }))

            line_item.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Delivery Charges',
                    },
                    unit_amount: 2 * 100,
                },
                quantity: 1,
            })

            const session = await stripe.checkout.sessions.create({
                line_items: line_item,
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`
            });
            
            res.status(200).json({ success: true,  session_url : session.url}); // sessionId: session.id,
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    verifyOrder: async( req, res) =>{
        try {
            const{orderId, success} = req.body;
            if(success === "true"){
                await orderModel.findByIdAndUpdate(orderId, { payment: true});
                res.status(200).json({ success: true, message: "Paid" });
            }else{
                await orderModel.findByIdAndDelete(orderId)
                res.status(200).json({ success: false, message: "Not Paid" });
            }
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    // user order for frontend
    getUserOrders: async(req, res) =>{
        try {
            const orders = await orderModel.find({userId: req.body.user.id}).sort({createdAt: -1});
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    },
};

export default orderController;

