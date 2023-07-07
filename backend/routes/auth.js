const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');
const { sendVerificationEmail } = require('../models/email');
const session = require('express-session');
const crypto = require('crypto');



const app = express();

const JWT_SECRET = "Bishalgodboy$";

app.use(session({
  secret: 'Bishalgodboy$',
  resave: false,
  saveUninitialized: true,
}));


// const generateUniqueToken = () => {
//   const tokenBytes = crypto.randomBytes(16);
//   return tokenBytes.toString('hex');
// };

// const uniqueToken = generateUniqueToken();
// console.log(uniqueToken);


// const verificationToken = generateUniqueToken(); // Implement a function to generate a unique token
// console.log(verificationToken);


const otp = Math.floor(100000 + Math.random() * 900000);
// Route 1 - Route for creating a user in the database or website
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("username", "Enter a valid username").isLength({ min: 6 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    
    try {
      // Check if user with the same email already exists
      const existingEmail = await User.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ success, error: "Email already exists" });
      }

      const existingUsername = await User.findOne({ username: req.body.username });
      if (existingUsername) {
        return res.status(400).json({ success, error: "Username already exists" });
      }

      //decrypting the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user using the User model/schema, we can also use a different way to do it
      const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: secPass,
        emailVerified: false
        // verificationToken: otp
      });

      // await user.save();

      const data = {
        user: {
          id: user.id,
        },
      };


      req.session.verificationToken = otp;
      console.log(req.session.verificationToken);
      req.session.email = req.body.email;
      console.log(otp);
      console.log(req.session.email)

      // Send verification email with OTP
      await sendVerificationEmail(user.email, otp);

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
      // return res.json(user);
    } catch (error) {
      //catching the unexpected erro
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);


const verifyOtp = otp; 

//Route -2 Verifiying the Email
router.post('/verify-otp', async (req, res) => {

console.log("verifyOtp" , verifyOtp);

  const { otp } = req.body;
  const { email } = req.body;

  console.log(otp);
  console.log(email);

  const sessionOTP = verifyOtp;

  console.log("----");

  try {


    // Find the user by email and check if the OTP matches
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (sessionOTP.toString() === otp) {

      req.session.destroy;
      user.emailVerified = true;
      await user.save();

      return res.json({ success: true, message: 'Email verified successfully' });
    }
    else {

      return res.status(400).json({ success: false, error: 'Invalid OTP' });
    }

    // console.log(sessionOTP.toString);

    // Mark the email as verified (you can update the user object accordingly in your database)

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});







// Route 3 - authenticate a user, Login credentials
router.post(
  "/login",
  [
    body("username", "Enter a valid username").exists(),
    body("password", "Must enter the password").exists(),
  ],
  async (req, res) => {
    let success = false;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ success, error: "Invalid Credentials" });
      }

      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        return res.status(400).json({ success, error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ erro: "Internal Server Error Occured" });
    }
  }
);


// Route 4 - Getting the details of the users who are loggedin
router.post("/getuser", fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ erro: "Internal Server Error Occured" });
  }

});

module.exports = router;
