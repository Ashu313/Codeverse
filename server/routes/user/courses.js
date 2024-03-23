const express = require('express');
//const courses=require("../../controllers/users/course")
const {
  courses,
  course,
  purchaseCourse,
  updateCourse,
  createCourse
} = require('../../controllers/users/course');
//const { authenticateJwtUser, authenticateJwtAdmin } = require('../controllers/auth');
const authMiddlewares = require('../../middlewares/authmiddlewares');
const router = express.Router();
const Razorpay=require('razorpay');
// routes/razorpay.js
 
 
router.get('/key', async (req, res) => {
  try {
    const razorpayKey ='rzp_test_BZtItAuhXcN3fg';
    if (!razorpayKey) {
      return res.status(500).json({ error: 'Razorpay key not found' });
    }
    res.json({ key: razorpayKey });
  } catch (error) {
    console.error('Error fetching Razorpay key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 // Backend code

router.post('/payment/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, course_id } = req.body;

  try {
  
    const razorpay = new Razorpay({
      key_id: 'rzp_test_BZtItAuhXcN3fg',
      key_secret: 'vHMneBuvNg3w5zMgrC7333D7',
    });

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Verify the payment signature
    const isValidSignature = razorpay.webhooks.verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature
    });

    if (payment && isValidSignature) {

      res.status(200).json({ success: true });
    } else {
      // Payment verification failed
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user/courses', courses);
router.get('/user/course/:courseId',course);
router.post('/user/course/:courseId', purchaseCourse);

router.post('/admin/course/create',  createCourse);
router.put('/admin/courses/:courseId',updateCourse);

module.exports = router;
