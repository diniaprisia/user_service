const User = require("../models/User");

// Manual validator
function validateUser(data) {
  const errors = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Name is required");
  }

  if (!data.email || data.email.trim() === "") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    }
  }

  const validRoles = ["customer", "seller", "admin"];
  if (data.role && !validRoles.includes(data.role)) {
    errors.push("Role must be customer/seller/admin");
  }

  return errors;
}


// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.addUser = async (req, res) => {
  const { name, email, role } = req.body;

  const errors = validateUser(req.body);
  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      errors
    });
  }

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({
        status: "error",
        errors: ["Email already exists"]
      });
    }

    const newUser = await User.create({ name, email, role });
    res.json(newUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
