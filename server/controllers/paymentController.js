import Razorpay from "razorpay";
import crypto from "node:crypto";

const KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

let razorpay;
try {
  razorpay = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
} catch (err) {
  console.log("Razorpay init skipped (keys not set). Demo mode active.");
}

/**
 * POST /api/payment/create-order
 * Creates a Razorpay order for the given amount.
 */
export const createPaymentOrder = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valid amount is required" });
  }

  // If Razorpay is not configured, return a demo order
  if (!razorpay || KEY_ID === "rzp_test_placeholder") {
    return res.json({
      id: `demo_order_${Date.now()}`,
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      status: "created",
      demo: true,
      key: KEY_ID
    });
  }

  try {
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ ...order, key: KEY_ID });
  } catch (error) {
    console.error("Razorpay order creation failed:", error.message);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

/**
 * POST /api/payment/verify
 * Verifies the Razorpay payment signature to confirm authenticity.
 */
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Demo mode — always verify
  if (!razorpay || KEY_ID === "rzp_test_placeholder") {
    return res.json({
      verified: true,
      demo: true,
      paymentId: razorpay_payment_id || `demo_pay_${Date.now()}`,
      orderId: razorpay_order_id || `demo_order_${Date.now()}`
    });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Missing payment verification fields" });
  }

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({
        verified: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      res.status(400).json({ verified: false, message: "Payment signature mismatch" });
    }
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};
