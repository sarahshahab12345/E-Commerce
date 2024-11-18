import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ImageUpload from "./image-upload";

function AdminViewProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(false);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
          <Sheet
            open={openCreateProductDialog}
            onOpenChange={setOpenCreateProductDialog}
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Product</SheetTitle>
              </SheetHeader>
              <ImageUpload
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageFile={imageFile}
                setImageFile={setImageFile}
              />

              <div className="py-6">
                <form className="space-y-4" onSubmit={(e) => {}}>
                  {/* product Title input */}
                  <div>
                    <label
                      htmlFor="productTitle"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Title
                    </label>
                    <input
                      type="text"
                      id="productTitle"
                      name="productTitle"
                      className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    />
                  </div>

                  {/* product Description input */}
                  <div>
                    <label
                      htmlFor="productDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Description
                    </label>
                    <textarea
                      className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                      id="productDescription"
                      name="productDescription"
                    ></textarea>
                  </div>

                  {/* product Category dropdown */}
                  <div>
                    <label
                      htmlFor="productCategory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Category
                    </label>

                    <select
                      name="productCategory"
                      id="productCategory"
                      className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    >
                      <option value="-1">Select Category</option>
                      <option value="mens">Men's</option>
                      <option value="womens">Women's</option>
                      <option value="kids">Kid's</option>
                      <option value="shoes">Shoes</option>
                      <option value="watches">Watches</option>
                    </select>
                  </div>
                  {/* product Category dropdown */}
                  <div>
                    <label
                      htmlFor="productBrand"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Brand
                    </label>

                    <select
                      name="productBrand"
                      id="productBrand"
                      className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    >
                      <option value="-1">Select Brand</option>

                      <option value={"nike"}>Nike</option>
                      <option value={"puma"}>puma</option>
                      <option value={"addidas"}>addidas</option>
                    </select>
                  </div>

                  {/* product price input */}
                  <div>
                    <label
                      htmlFor="productPrice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Price
                    </label>
                    <input
                      type="number"
                      id="productPrice"
                      name="productPrice"
                      className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    />
                  </div>
                  {/* product price input */}
                  <div>
                    <label
                      htmlFor="salePrice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sale Price
                    </label>
                    <input
                      type="number"
                      id="salePrice"
                      name="salePrice"
                      className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    />
                  </div>
                  {/* product price input */}
                  <div>
                    <label
                      htmlFor="totalStock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Total Stock
                    </label>
                    <input
                      type="number"
                      id="totalStock"
                      name="totalStock"
                      className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    />
                  </div>

                  {/* Submit button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                    >
                      Create Product
                    </button>
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default AdminViewProducts;
