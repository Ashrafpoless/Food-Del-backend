import userModel from "../models/userModel.js"


const cartController = {
    addToCart: async(req, res) => {
        try {
            let userData = await userModel.findById(req.body.userId);
            let cart = await userData.cart;
            if(!cart[req.body.itemId]) {
                cart[req.body.itemId] = 1;
            }else{
                cart[req.body.itemId] += 1;
            }
            await userModel.findByIdAndUpdate(req.body.userId,{ cart});
            res.status(200).json({success: true, message: "Item added to cart"});

        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    },
    removeFromCart: async(req, res) => {
        try {
            let userData = await userModel.findById(req.body.userId);
            let cart = await userData.cart;
            if(cart[req.body.itemId]>0){
                 cart[req.body.itemId] -= 1;
            }
            await userModel.findByIdAndUpdate(req.body.userId,{ cart});
            res.status(200).json({success: true, message: "Item removed from cart"});

        } catch (error) {
            console.log(error.message);
            res.status(500).json({success: false, message: error.message});
        }
    },
    getCart: async(req, res) =>{
        try {
            let userData = await userModel.findById(req.body.userId);
            let cart = await userData.cart;
            res.status(200).json({success: true, cart});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({success: false, message: error.message});
        }
    }  
};

export default cartController;