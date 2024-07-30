import userModel from "../models/userMode.js";

// Add item to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await  userData.cartData || {};
// means we alway need itemId during adding new product in the  cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: "added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
    }
}

// Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await  userData.cartData || {};

        if (cartData[req.body.itemId]) {
            if (cartData[req.body.itemId] > 1) {
                // Decrease the quantity by 1
                cartData[req.body.itemId] -= 1;
            } else {
                // Remove the item from the cart if its quantity is 1
                delete cartData[req.body.itemId];
            }
        } else {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing from cart", error: error.message });
    }
}


// Get user cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await  userData.cartData || {};
        res.json({ success: true, cart: cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cart", error: error.message });
    }
}

export { addToCart, removeFromCart, getCart }
