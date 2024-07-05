const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Administrator = require("../models/administratorModel");
const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// @desc Register a admin
//@route POST/api/users/register
//@access public

const registerUser = asyncHandler(async (req, resp) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    resp.status(400);
    throw new Error("password and confirmPassword are not matched !");
  }

  if (!username || !email || !password || !confirmPassword) {
    resp.status(400);
    throw new Error("All fields are mandatory !");
  }

  const administratorUserAvailable = await Administrator.findOne({ email });
  if (administratorUserAvailable) {
    resp.status(400);
    throw new Error("User already registered !");
  }

  //Hash password;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);
  //console.log
  //Hash confirmPassword;

  const hashedCpassword = await bcrypt.hash(confirmPassword, 10);
  console.log("Hashed CPassword", hashedCpassword);

  const administrator = await Administrator.create({
    username,
    email,
    password: hashedPassword,
    confirmPassword: hashedCpassword,
  });
  console.log(`Administrator User created ${administrator}`);
  if (administrator) {
    resp
      .status(201)
      .json({ _id: administrator.id, email: administrator.email });
  } else {
    resp.status(400);
    throw new Error("administrator data us not valid");
  }

  resp.status(200).json({ message: " Register the administrator" });
});

// @desc Login a user
//@route POST/api/users/login
//@access public

const loginUser = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    resp.status(400);
    throw new Error("All fields are mandatory !");
  }

  const administrator = await Administrator.findOne({ email });
  //compare password with hashedpassword
  if (
    administrator &&
    (await bcrypt.compare(password, administrator.password))
  ) {
    const accessToken = jwt.sign(
      {
        userAdministrator: {
          username: administrator.username,
          email: administrator.email,
          id: administrator.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    resp.status(200).json({ accessToken });
  } else {
    resp.status(401);
    throw new Error("email or password is not valid");
  }

  resp.json({ message: "login the admin" });
});

//

// @desc Update a user's password directly by object ID
// @route PUT /api/users/update-password/:id
// @access Private

const updatePassword = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  console.log(`Received ID: ${id}`);

  // Ensure all required fields are provided
  if (!newPassword || !confirmNewPassword) {
    res.status(400).json({ message: "All fields are mandatory!" });
    return;
  }

  // Check if newPassword and confirmNewPassword match
  if (newPassword !== confirmNewPassword) {
    res
      .status(400)
      .json({ message: "New password and confirmation do not match!" });
    return;
  }

  try {
    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid user ID!" });
      return;
    }

    // Find the administrator by ID
    const administrator = await Administrator.findById(id);
    console.log(administrator);
    if (!administrator) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    administrator.password = hashedNewPassword;
    await administrator.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(`Error updating password: ${error.message}`);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

const getAllAdministrators = asyncHandler(async (req, res) => {
  try {
    // Fetch all administrators
    const administrators = await Administrator.find({});

    // Send the retrieved data back as a JSON response
    res.status(200).json(administrators);
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ message: error.message });
  }
});
// @desc current  userinfo
//@route POST/api/users/current
//@access private

const currentUser = asyncHandler(async (req, resp) => {
  resp.json(req.userAdministrator);
});

module.exports = { registerUser, loginUser, currentUser, updatePassword, getAllAdministrators };
