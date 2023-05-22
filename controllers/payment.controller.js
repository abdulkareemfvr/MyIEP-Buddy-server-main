const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.getAllUser = async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list();
    const subscribers = [];

    for (const subscription of subscriptions.data) {
      const customer = await stripe.customers.retrieve(subscription.customer);
      subscribers.push({
        userId: customer.id,
        email: customer.email,
        subscriptionId: subscription.id,
        planId: subscription.items.data[0].price.id,
        status: subscription.status,
      });
    }

    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error retrieving subscribers:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports.getSingleUser = async (req, res) => {
  try {
    // Find the customer associated with the email
    const customer = await stripe.customers.list({
      email: req.params.email,
      limit: 1, // Limit the result to 1 customer
    });

    if (customer.data.length === 0) {
      // If no customer found with the provided email
      return res.status(404).json({ error: "Customer not found" });
    }

    const customerId = customer.data[0].id;

    // Find the subscriptions associated with the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1, // Limit the result to 1 subscription
    });

    if (subscriptions.data.length === 0) {
      // If no subscription found for the customer
      return res.status(404).json({ error: "Subscription not found" });
    }

    const subscriptionId = subscriptions.data[0].id;

    // Return the user details
    res.status(200).json({
      userId: customerId,
      email: customer.data[0].email,
      subscriptionId: subscriptionId,
      planId: subscriptions.data[0].items.data[0].price.id,
      status: subscriptions.data[0].status,
    });
  } catch (error) {
    console.error("Error retrieving subscriber:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports.deleteSubscription = async (req, res) => {
  try {
    // Find the customer associated with the email
    const customer = await stripe.customers.list({
      email: req.params.email,
      limit: 1, // Limit the result to 1 customer
    });

    if (customer.data.length === 0) {
      // If no customer found with the provided email
      return res.status(404).json({ error: "Customer not found" });
    }

    const customerId = customer.data[0].id;

    // Delete the customer
    await stripe.customers.del(customerId);

    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
