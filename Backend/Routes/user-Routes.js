import express from "express";
import {
  authMiddleware,
  login,
  logout,
  register,
} from "../Controllers/user-controllers.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    status: "Success",
    message: "User authenticated successfully",
    user: user,
  });
});

export default router;
