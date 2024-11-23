import express from "express";
import { upload } from "../helpers/cloudinary.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  handleImageUpload,
  updateProduct,
} from "../controllers/product-controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("file"), handleImageUpload);

router.route("/all").get(getAllProducts);
router.route("/create").post(createProduct);
router.route("/update/:id").put(updateProduct);
router.route("/delete/:id").delete(deleteProduct);

export default router;
