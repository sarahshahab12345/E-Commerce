import { imageUploadUtil } from "../helpers/cloudinary.js";
import Product from "../models/product-model.js";

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      status: "Success",
      message: "Products fetched successfully",
      data: {
        count: products.length,
        products,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      status: "Error",
      message: "An error occured while fetching products",
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !brand ||
      !price ||
      !salePrice ||
      !totalStock
    ) {
      return res.json({
        success: false,
        status: "Error",
        message: "Please provide all the required fields",
      });
    }

    const createdProduct = await Product.create({
      image: image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    if (createdProduct) {
      return res.status(201).json({
        success: true,
        status: "Success",
        message: "Product created successfully",
        data: createdProduct,
      });
    } else {
      return res.json({
        success: false,
        status: "Error",
        message: "Error occured while creating product",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      status: "Error",
      message: "Error occured while creating product",
    });
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const productTobeDeleted = await Product.findById(id);

    if (productTobeDeleted) {
      await Product.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        status: "Success",
        message: "Product deleted successfully",
      });
    } else {
      return res.json({
        success: false,
        status: "Error",
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      status: "Error",
      message: "Error occured while deleting product",
    });
  }
};
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  try {
    const productTobeUpdated = await Product.findById(id);

    if (productTobeUpdated) {
      await Product.findByIdAndUpdate(id, {
        image: product.image || productTobeUpdated.image,
        title: product.title || productTobeUpdated.title,
        description: product.description || productTobeUpdated.description,
        category: product.category || productTobeUpdated.category,
        brand: product.brand || productTobeUpdated.brand,
        price: product.price || productTobeUpdated.price,
        salePrice: product.salePrice || productTobeUpdated.salePrice,
        totalStock: product.totalStock || productTobeUpdated.totalStock,
        averageReview: productTobeUpdated.averageReview,
      });
      return res.status(200).json({
        success: true,
        status: "Success",
        message: "Product updated successfully",
      });
    } else {
      return res.json({
        success: false,
        status: "Error",
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      status: "Error",
      message: "Error occured while updating product",
    });
  }
};

export {
  handleImageUpload,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
