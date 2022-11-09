import Product from "../models/productModel.js";
import wrap from "../middlewares/wrap.js";

/**
 * @desc Fetch all products
 * @route GET /api/products/
 * @access Public
 */
export const getProducts = wrap(async (req, res, next) => {
    // throw new Error("Not Authorized");
    // setTimeout(async () => {
    const products = await Product.find();
    return res.json(products);
    // }, 5000);
});

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
export const getProductById = wrap(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error(`Product not found by id: ${productId}`);
    }
    return res.json(product);
});

/**
 * @desc Delete single product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
export const deleteProductById = wrap(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error(`Product not found by id: ${productId}`);
    }
    await Product.deleteOne({ _id: productId });
    return res.json({ message: `${productId} deleted successfully` });
});
