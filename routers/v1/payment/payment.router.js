const express = require("express");
const {
  subscriptionPayment,
  getAllUser,
  getSingleUser,
  deleteSubscription,
} = require("../../../controllers/payment.controller");
const router = express.Router();

router.route("/").get(getAllUser); //.post(subscriptionPayment);
router.route("/:email").get(getSingleUser).delete(deleteSubscription);

module.exports = router;
