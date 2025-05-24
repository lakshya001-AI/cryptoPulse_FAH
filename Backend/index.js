const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./Database/connectDB");
const userModel = require("./Database/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jwt
dotenv.config();
connectMongoDB();

app.use(express.json());
app.use(cors());

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey12345!@";

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, this is the Backend");
});

// Create Account Route
app.post("/createAccount", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;

    // Check if user already exists
    const userExists = await userModel.findOne({ emailAddress });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
    });

    console.log(newUser);
    res.status(201).send({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Login Route with JWT Token Generation
app.post("/loginUser", async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ emailAddress });
    if (!user) {
      return res.status(401).send({ message: "User not found!" });
    }

    // Verify password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).send({ message: "Invalid credentials!" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.emailAddress },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token validity
      }
    );

    res.status(200).send({
      message: "Logged in successfully!",
      token, // Send the token to the client
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send({ message: "An error occurred" });
  }
});

// Middleware to Verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Store decoded data in request object
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token!" });
  }
};

// Adding the currency to the Favorite

app.post("/addToFavorite", async (req, res) => {
  try {
    const { coinId, coinName, userEmailAddress } = req.body;

    // Find the user by email address
    let user = await userModel.findOne({ emailAddress: userEmailAddress });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the coinId already exists in the favoriteCryptos array
    const isCoinAlreadyFavorite = user.favoriteCryptos.some(
      (crypto) => crypto.coinId === coinId
    );

    if (isCoinAlreadyFavorite) {
      return res
        .status(400)
        .send({ message: "CryptoCurrency is already in favorites" });
    }

    // Add the coin to the favoriteCryptos array
    user.favoriteCryptos.push({ coinId, coinName });

    // Save the updated user to the database
    await user.save();

    res
      .status(200)
      .send({ message: "CryptoCurrency added to favorites successfully" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).send({ message: "An error occurred" });
  }
});

// Show the favorite crypto Prices of the User

app.post("/getTheFavoriteCryptoCurrencies", async (req, res) => {
  const { userEmailAddress } = req.body;

  try {
    // Fetch user favorites from the database
    const user = await userModel.findOne({ emailAddress: userEmailAddress });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ favoriteCryptos: user.favoriteCryptos });
  } catch (error) {
    console.error("Error fetching favorite cryptocurrencies:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Remove the coin from the favorites

app.post("/removeFavoriteCrypto", async (req, res) => {
  const { userEmailAddress, coinId } = req.body;

  try {
    // Find and update the user document
    const user = await userModel.findOneAndUpdate(
      { emailAddress: userEmailAddress },
      { $pull: { favoriteCryptos: { coinId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Favorite cryptocurrency removed successfully" });
  } catch (error) {
    console.error("Error removing favorite cryptocurrency:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Example of a Protected Route
app.get("/protectedRoute", verifyToken, (req, res) => {
  res.status(200).send({
    message: "Access granted to protected route!",
    user: req.user, // Return user data from token
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
