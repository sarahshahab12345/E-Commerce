import userModel from "../Model/user-Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ===================== Register ===========================
const register = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userName || !userEmail || !userPassword) {
    return res
      .status(400)
      .json({ status: "Error", message: "Please provide all the fields" });
  }

  const userAvailable = await userModel.findOne({ userEmail });

  if (userAvailable) {
    return res.status(400).json({
      status: "Error",
      message: "User Already exists with this email",
    });
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  const user = await userModel.create({
    userName,
    userEmail,
    userRole: "user",
    userPassword: hashedPassword,
  });

  if (!user) {
    return res.status(400).json({
      status: "Error",
      message: "Something went wrong while registering user",
    });
  }

  return res
    .status(201)
    .json({ status: "Success", message: "User Registered Successfully" });
};

// ===================== Login ===========================
const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res
      .status(400)
      .json({ status: "Error", message: "Please provide all the fields" });
  }

  const userAvailable = await userModel.findOne({ userEmail });

  if (!userAvailable) {
    return res.status(400).json({
      status: "Error",
      message: "User not found with this email",
    });
  }

  if (
    userAvailable &&
    (await bcrypt.compare(userPassword, userAvailable.userPassword))
  ) {
    let accessToken = jwt.sign(
      {
        user: {
          id: userAvailable._id,
          name: userAvailable.userName,
          email: userAvailable.userEmail,
          role: userAvailable.userRole,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    return res
      .cookie("token", accessToken, { httpOnly: true, secure: false })
      .json({
        success: true,
        status: "Success",
        message: "User Logged In Successfully",
        user: userAvailable,
      });
  } else {
    return res.json({
      success: false,
      status: "Error",
      message: "Invalid Credentials",
    });
  }
};

// ===================== Logout ===========================

const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    status: "Success",
    message: "User Logged Out Successfully",
  });
};

// ===================== Auth Middleware ===========================

const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      status: "Error",
      message: "Unauthorized User",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      status: "Error",
      message: "Unauthorized User",
    });
  }
};

export { login, register, logout, authMiddleware };
