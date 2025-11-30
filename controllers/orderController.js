import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      status: "pending",
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
