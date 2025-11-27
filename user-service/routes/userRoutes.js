const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.addUser);

module.exports = router;
