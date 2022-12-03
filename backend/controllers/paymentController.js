const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51MB2yjHR3ue7I09LEFcbYbW0jZJ83W8FBGZR9w4WH7NUxJeM4m1HIypzrcNNkoYloZSzr5cjvkZXtv34yeP0Pcff00CvI5H6n1"
);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });
  console.log("Payment intent:", paymentIntent);

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey:
      "pk_test_51MB2yjHR3ue7I09L9gqQLboCeqSMyaWdrAPUU3WeLdYyrA8cIqJM7j65as3A80vQlPaXbWASDSVlQMwDqTmCVjb8005EpecL85",
  });
});
