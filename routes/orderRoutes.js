import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);

export default router;
