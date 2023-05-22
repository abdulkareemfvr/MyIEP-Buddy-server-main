const express = require("express");
const {
  generateText,
  crateGoal,
  getGoalData,
} = require("../../../controllers/userData/goal.controller");
const {
  accommodationsGenerateText,
  crateAccommodations,
} = require("../../../controllers/userData/accommodations.controller");
const {
  presentGenerateText,
  cratePresent,
} = require("../../../controllers/userData/present.controller");
const {
  getUserData,
  createUserData,
  getUserByEmail,
  deleteUserDataById,
} = require("../../../controllers/userData/userData.controller");

const router = express.Router();

// goal
router.route("/goal-generate-text").post(generateText);

// present
router.route("/present-generate-text").post(presentGenerateText);

// accommodations
router.route("/accommodations-generate-text").post(accommodationsGenerateText);

router.route("/:email").get(getUserByEmail).post(createUserData);
router.route("/:email/:id").get(getUserData).delete(deleteUserDataById);

router.route("/goal-create/:id").put(crateGoal);
router.route("/accommodations-create/:id").put(crateAccommodations);
router.route("/present-create/:id").put(cratePresent);

module.exports = router;


