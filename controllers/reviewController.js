import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      product: req.params.id,
      user: req.user._id,
      rating,
      comment,
    });

    // push into product
    const product = await Product.findById(req.params.id);
    product.reviews.push(review._id);
    await product.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
