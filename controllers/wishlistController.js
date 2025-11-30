import Wishlist from "../models/Wishlist.js";

export const getWishlist = async (req, res) => {
  try {
    const list = await Wishlist.findOne({ user: req.user._id }).populate("products");
    res.json(list || { products: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [req.body.product],
      });
    } else {
      if (!wishlist.products.includes(req.body.product)) {
        wishlist.products.push(req.body.product);
      }
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== req.params.id
    );

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
