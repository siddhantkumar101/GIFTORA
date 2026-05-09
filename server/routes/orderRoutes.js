import express from "express";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.route("/")
  .get(getOrders)
  .post(createOrder);

router.route("/:orderNumber/status")
  .patch(updateOrderStatus);

export default router;
